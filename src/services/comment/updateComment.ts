import db from '@models';

const updateComment = async (
  userId: string,
  commentId: string,
  description: string,
): Promise<void> => {
  try {
    const targetComment = await db.Comment.findById(commentId);
    if (!targetComment) {
      throw new Error('찾는 댓글이 없습니다.');
    }
    if (typeof targetComment.userId === 'string') {
      throw new Error('userId가 String입니다.');
    }
    if (!targetComment.userId.equals(userId)) {
      throw new Error('작성자가 아닙니다.');
    }
    targetComment.description = description;
    await targetComment.save();
  } catch (err) {
    throw new Error(err);
  }
};

export default updateComment;
