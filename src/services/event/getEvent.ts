import db from '@models';
import { Event } from '@root/interfaces/models/event';

const getEvent = async (_id: string, eventId: string): Promise<Event> => {
  const targetEvent = await db.Event.findOne({
    _id: eventId,
  });
  if (!targetEvent) {
    throw '찾는 이벤트가 없습니다.';
  }
  const targetIssue = await db.Issue.findOne({
    _id: targetEvent.issueId,
  }).exec();
  if (!targetIssue) {
    throw '찾는 이슈가 없습니다.';
  }
  const targetProject = await db.Project.findOne({
    _id: targetIssue.projectId,
    $or: [{ owner: _id }, { admins: _id }, { members: _id }],
  })
    .populate('issues')
    .populate({ path: 'owner', select: 'email' })
    .populate({ path: 'members', select: 'email' })
    .populate({ path: 'admins', select: 'email' })
    .exec();
  if (!targetProject) {
    throw '찾는 프로젝트가 없습니다.';
  }
  return targetEvent;
};

export default getEvent;
