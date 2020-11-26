import db from '@models';

const checkEmail = async (email: string): Promise<boolean> => {
  try {
    const user = await db.User.findOne({ email });
    if (user) {
      return false;
    }
    return true;
  } catch (err) {
    throw new Error(err);
  }
};

export default { checkEmail };
