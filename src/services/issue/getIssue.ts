import db from '@models';
import { Issue } from '@interfaces/models/issue';

const getIssue = async (_id: string, issueId: string): Promise<Issue> => {
  try {
    const targetIssue = await db.Issue.findOne({
      _id: issueId,
    })
      .populate({
        path: 'events',
        select: '_id',
        options: { sort: { timeStamp: -1 } },
      })
      .exec();
    if (!targetIssue) {
      throw new Error('찾는 이슈가 없습니다.');
    }
    const targetProject = await db.Project.findOne({
      _id: targetIssue.projectId,
      $or: [{ owner: _id }, { admins: _id }, { members: _id }],
    }).exec();
    if (!targetProject) {
      throw new Error('당신의 프로젝트가 아닙니다.');
    }
    return targetIssue;
  } catch (err) {
    throw new Error(err);
  }
};

export default getIssue;
