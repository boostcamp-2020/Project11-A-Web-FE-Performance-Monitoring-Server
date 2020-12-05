import db from '@models';

const updateProfile = async (_id: string, nickname: string): Promise<void> => {
  await db.User.findByIdAndUpdate(_id, { nickname }).exec();
};

export default updateProfile;
