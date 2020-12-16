import db from '@models';
import { Event } from '@interfaces/models/event';
import { Project } from '@interfaces/models/project';
import { sendMail, sendLevel } from '@utils/sendMail';
import { StackTrace } from '@interfaces/models/stackTrace';
import addStatistic from './statistics';
import { alertCheck } from '@utils/alertLevel';

interface Option {
  [K: string]: string | StackTrace | undefined;
}

const catchEventService = async (
  event: Event,
  project: Project,
): Promise<void> => {
  const option: Option = {
    eventName: event.type || event.message,
    errorMessage: event.value,
    errorStack: event.stacktrace?.[0],
    issueType: event.type ? 'error' : 'message',
  };
  Object.keys(option).forEach(
    (key: string) => option[key] === undefined && delete option[key],
  );
  const targetIssueQuery = db.Issue.findOne({
    ...option,
    projectId: project._id as string,
  }).exec();
  const targetProjectQuery = db.Project.findById(project._id).exec();
  const [constTargetIssue, targetProject] = await Promise.all([
    targetIssueQuery,
    targetProjectQuery,
  ]);
  let targetIssue = constTargetIssue;
  if (!targetProject) {
    throw '찾는 프로젝트가 없습니다.';
  }
  let init = false;
  if (!targetIssue) {
    init = true;
    targetIssue = new db.Issue({
      ...option,
      projectId: project._id,
      isResolved: false,
    });
  }
  try {
    await targetIssue.save();
  } catch (err) {
    init = false;
    targetIssue = await db.Issue.findOne({
      ...option,
      projectId: project._id as string,
    }).exec();
    if (!targetIssue) {
      throw 'unique 이외의 오류입니다.';
    }
  }
  if (init) {
    const targetStatistic = new db.Statistics({
      issueId: targetIssue._id,
    });
    await targetStatistic?.save();
    targetProject.issues?.push(targetIssue._id);
  }
  const errorSample = new db.Event({
    ...event,
    issueId: targetIssue._id,
  });
  const addPromise = addStatistic(targetIssue._id, event);
  targetIssue.events.push(errorSample._id);
  let mailPromise;
  if (alertCheck(targetProject.alertLevel as string, event.level as string)) {
    mailPromise = sendMail(targetProject);
  }
  await Promise.all([
    errorSample.save(),
    targetIssue.save(),
    targetProject.save(),
    addPromise,
  ]);
};

export default catchEventService;
