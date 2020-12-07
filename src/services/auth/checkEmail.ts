import db from '@models';

const checkEmail = async (email: string): Promise<boolean> => {
  const user = await db.User.findOne({ email });
  if (user) {
    return false;
  }
  return true;
};

export default { checkEmail };
