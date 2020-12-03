import db from '@models';

const updateProfile = async (_id: string, nickname: string): Promise<void> => {
  try {
    await db.User.findByIdAndUpdate(_id, { nickname });
  } catch (err) {
    throw new Error(err);
  }
};

export default updateProfile;
