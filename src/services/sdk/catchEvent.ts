import db from '@models';
import { Event } from '@root/interfaces/models/event';
import { Project } from '@interfaces/models/project';

type Option = {
  [K in string]: string | undefined;
};

const catchEventService = async (
  event: Event,
  project: Project,
): Promise<void> => {
  const option: Option = {
    errorName: event.type,
    errorMessage: event.value,
    message: event.message,
  };
  Object.keys(option).forEach(
    (key: string) => option[key] === undefined && delete option[key],
  );
  let targetIssue = await db.Issue.findOne({
    ...option,
    projectId: project._id as string,
  });
  if (!targetIssue) {
    targetIssue = await new db.Issue({
      ...option,
      projectId: project._id,
      isResolved: false,
    });
    const targetProject = await db.Project.findById(project._id);
    if (!targetProject) {
      throw '찾는 프로젝트가 없습니다.';
    }
    targetProject.issues?.push(targetIssue._id);
    await targetProject.save();
  }
  const errorSample = await new db.Event({
    ...event,
    issueId: targetIssue._id,
  });
  targetIssue.events.push(errorSample._id);
  await targetIssue.save();
  await errorSample.save();
};

export default catchEventService;
