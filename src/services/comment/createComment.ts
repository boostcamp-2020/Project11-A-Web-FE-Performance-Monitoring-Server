import db from '@models';

const createComment = async (
  userId: string,
  issueId: string,
  description: string,
): Promise<string> => {
  const targetComment = new db.Comment({
    userId,
    issueId,
    description,
  });
  const targetIssue = await db.Issue.findById(issueId).exec();
  if (!targetIssue) {
    throw '찾는 이슈가 없습니다.';
  }
  const targetProject = await db.Project.findOne({
    _id: targetIssue.projectId,
    $or: [{ owner: userId }, { admins: userId }, { members: userId }],
  }).exec();
  if (!targetProject) {
    throw '당신의 프로젝트가 아닙니다.';
  }
  targetIssue.comments?.push(targetComment._id);
  await Promise.all([targetComment.save(), targetIssue.save()]);
  return targetComment._id;
};

export default createComment;
