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
  const startTime = new Date().getTime();
  const option: Option = {
    errorName: event.type,
    errorMessage: event.value,
    message: event.message,
  };
  Object.keys(option).forEach(
    (key: string) => option[key] === undefined && delete option[key],
  );
  console.log(' line19 : ' + Number(new Date().getTime() - startTime));
  let targetIssue = await db.Issue.findOne({
    ...option,
    projectId: project._id as string,
  });
  console.log(' line23 : ' + Number(new Date().getTime() - startTime));

  if (!targetIssue) {
    targetIssue = await new db.Issue({
      ...option,
      projectId: project._id,
      isResolved: false,
    });
    console.log(' line30 : ' + Number(new Date().getTime() - startTime));

    const targetProject = await db.Project.findById(project._id);
    if (!targetProject) {
      throw '찾는 프로젝트가 없습니다.';
    }

    console.log(' line37 : ' + Number(new Date().getTime() - startTime));

    targetProject.issues?.push(targetIssue._id);
    await targetProject.save();
    console.log(' line45 : ' + Number(new Date().getTime() - startTime));
  }
  const errorSample = new db.Event({
    ...event,
    issueId: targetIssue._id,
  });
  targetIssue.events.push(errorSample._id);
  await targetIssue.save();
  console.log(' line53 : ' + Number(new Date().getTime() - startTime));

  await errorSample.save();
  console.log(' line57 : ' + Number(new Date().getTime() - startTime));
};

export default catchEventService;
