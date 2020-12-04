import db from '@models';
import { Event } from '@interfaces/event';
import { Project } from '@interfaces/project';

const catchErrorService = async (
  event: Event,
  project: Project,
): Promise<void> => {
  try {
    let targetIssue = await db.Issue.findOne({
      errorName: event.type,
      errorMessage: event.value,
      projectId: project._id as string,
    });
    if (!targetIssue) {
      targetIssue = await new db.Issue({
        projectId: project._id,
        errorName: event.type,
        errorMessage: event.value,
        isResolved: false,
      });
      const targetProject = await db.Project.findById(project._id);
      if (!targetProject) {
        throw new Error('찾는 프로젝트가 없습니다.');
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
  } catch (err) {
    throw new Error(err);
  }
};

export default catchErrorService;
