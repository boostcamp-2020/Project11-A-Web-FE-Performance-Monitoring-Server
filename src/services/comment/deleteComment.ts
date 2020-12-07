import db from '@models';

const deleteComment = async (
  userId: string,
  commentId: string,
): Promise<void> => {
  await db.Comment.findOneAndDelete({ userId, _id: commentId });
};

export default deleteComment;
