import db from '@models';
import { Event } from '@root/interfaces/models/event';
import { Project } from '@interfaces/models/project';
import { sendMail, sendLevel } from '@utils/sendMail';
import { StackTrace } from '@interfaces/models/stackTrace';

type Option = {
  [K in string]: string | StackTrace | undefined;
};

const catchEventService = async (
  event: Event,
  project: Project,
): Promise<void> => {
  const option: Option = {
    errorName: event.type,
    errorMessage: event.value,
    errorStack: event.stacktrace?.[0],
    message: event.message,
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
  if (!targetIssue) {
    targetIssue = new db.Issue({
      ...option,
      projectId: project._id,
      isResolved: false,
    });
    targetProject.issues?.push(targetIssue._id);
    await targetProject.save();
  }
  const errorSample = new db.Event({
    ...event,
    issueId: targetIssue._id,
  });
  targetIssue.events.push(errorSample._id);
  if (sendLevel.includes(event.level as string)) {
    sendMail(targetProject);
  }
  await Promise.all([errorSample.save(), targetIssue.save()]);
};

export default catchEventService;
