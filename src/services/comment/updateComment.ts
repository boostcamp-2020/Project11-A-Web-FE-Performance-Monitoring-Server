import db from '@models';

const updateComment = async (
  userId: string,
  commentId: string,
  description: string,
): Promise<void> => {
  const targetComment = await db.Comment.findById(commentId);
  if (!targetComment) {
    throw '찾는 댓글이 없습니다.';
  }
  if (typeof targetComment.userId === 'string') {
    throw 'userId가 String입니다.';
  }
  if (!targetComment.userId.equals(userId)) {
    throw '작성자가 아닙니다.';
  }
  targetComment.description = description;
  await targetComment.save();
};

export default updateComment;
