import db from '@models';
import Option from '@interfaces/pageOption';
import { Document, PaginateResult } from 'mongoose';
import { Comment } from '@interfaces/models/comment';

const getComments = async (
  userId: string,
  issueId: string,
  option: Option,
): Promise<PaginateResult<Comment & Document>> => {
  const targetIssue = await db.Issue.findById(issueId).exec();
  if (!targetIssue) {
    throw '찾는 이슈가 없습니다.';
  }
  const commentListQuery = db.Comment.paginate(
    { issueId },
    {
      ...option,
      sort: { createdAt: 1 },
      populate: { path: 'userId', select: 'email' },
    },
  );
  const targetProjectQuery = db.Project.findOne({
    _id: targetIssue.projectId,
    $or: [{ owner: userId }, { admins: userId }, { members: userId }],
  }).exec();
  const [commentList, targetProject] = await Promise.all([
    commentListQuery,
    targetProjectQuery,
  ]);
  if (!targetProject) {
    throw '당신의 프로젝트가 아닙니다.';
  }
  return commentList;
};

export default getComments;
