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
  let targetIssue = await db.Issue.findOne({
    error: event.error,
    projectId: project._id,
  });
  if (!targetIssue) {
    targetIssue = await new db.Issue({
      projectId: project._id,
      error: event.error,
      isResolved: false,
    });
  }
  const errorSample = await new db.Event({
    ...event,
    issueId: targetIssue._id,
  });
  await errorSample.save();
};

export default catchErrorService;
