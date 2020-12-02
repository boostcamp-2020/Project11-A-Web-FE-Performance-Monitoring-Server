import db from '@models';
import { Event } from '@interfaces/event';
import { Project } from '@interfaces/project';

interface EventRequest extends Event {
  error: string;
}

const catchErrorService = async (
  event: EventRequest,
  project: Project,
): Promise<void> => {
  try {
    let targetIssue = await db.Issue.findOne({
      errorName: event.type,
      errorMessage: event.value,
      projectId: project._id,
    });
    if (!targetIssue) {
      targetIssue = await new db.Issue({
        projectId: project._id,
        errorName: event.type,
        errorMessage: event.value,
        isResolved: false,
      });
    }
    const errorSample = await new db.Event({
      ...event,
      issueId: targetIssue._id,
    });
    targetIssue.events.push(project._id as string);
    await targetIssue.save();
    await errorSample.save();
  } catch (err) {
    throw new Error(err);
  }
};

export default catchErrorService;
