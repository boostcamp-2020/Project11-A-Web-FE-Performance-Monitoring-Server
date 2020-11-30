import db from '@models';
import { Event } from '@interfaces/event';

const getEvent = async (_id: string, eventId: string): Promise<Event> => {
  try {
    const targetEvent = await db.Event.findOne({
      _id: eventId,
    }).populate('issueId');
    if (!targetEvent) {
      throw new Error('찾는 이벤트가 없습니다.');
    }
    const targetIssue = await db.Issue.findOne({
      _id: targetEvent.issueId,
    });
    if (!targetIssue) {
      throw new Error('찾는 이슈가 없습니다.');
    }
    const targetProject = await db.Project.findOne({
      _id: targetIssue.projectId,
      $or: [{ owner: _id }, { admins: _id }, { members: _id }],
    })
      .populate('issues')
      .populate({ path: 'owner', select: 'email' })
      .populate({ path: 'members', select: 'email' })
      .populate({ path: 'admins', select: 'email' });
    if (!targetProject) {
      throw new Error('찾는 프로젝트가 없습니다.');
    }
    return targetEvent;
  } catch (err) {
    throw new Error(err);
  }
};

export default getEvent;
