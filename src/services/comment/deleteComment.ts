import db from '@models';

const deleteComment = async (
  userId: string,
  commentId: string,
): Promise<void> => {
  try {
    await db.Comment.findOneAndDelete({ userId, _id: commentId });
  } catch (err) {
    throw new Error(err);
  }
};

export default deleteComment;
