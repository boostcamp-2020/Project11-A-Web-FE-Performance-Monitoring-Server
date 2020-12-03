import db from '@models';
import Option from '@interfaces/pageOption';
import { Document, PaginateResult } from 'mongoose';
import { Comment } from '@interfaces/models/comment';

const getComments = async (
  userId: string,
  issueId: string,
  option: Option,
): Promise<PaginateResult<Comment & Document>> => {
  try {
    const commentList = db.Comment.paginate(
      { issueId },
      {
        ...option,
        sort: { createdAt: 1 },
        populate: { path: 'userId', select: 'email' },
      },
    );
    const targetIssue = await db.Issue.findById(issueId);
    if (!targetIssue) {
      throw new Error('찾는 이슈가 없습니다.');
    }
    const targetProject = db.Project.findOne({
      _id: targetIssue.projectId,
      $or: [{ owner: userId }, { admins: userId }, { members: userId }],
    });
    await Promise.all([commentList, targetProject]);
    if (!targetProject) {
      throw new Error('당신의 프로젝트가 아닙니다.');
    }
    return commentList;
  } catch (err) {
    throw new Error(err);
  }
};

export default getComments;
