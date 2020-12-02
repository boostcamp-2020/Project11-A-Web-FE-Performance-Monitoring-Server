import db from '@models';

const createComment = async (
  userId: string,
  issueId: string,
  description: string,
): Promise<void> => {
  try {
    const targetComment = await new db.Comment({ userId, description });
    const targetIssue = await db.Issue.findById(issueId);
    if (!targetIssue) {
      throw new Error('찾는 이슈가 없습니다.');
    }
    targetIssue.comments?.push(targetComment._id);
    await Promise.all([targetComment.save(), targetIssue.save()]);
  } catch (err) {
    throw new Error(err);
  }
};

export default createComment;
