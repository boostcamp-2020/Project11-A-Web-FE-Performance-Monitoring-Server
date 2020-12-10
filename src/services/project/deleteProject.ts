import db from '@models';

const deleteService = async (
  userId: string,
  projectId: string,
): Promise<void> => {
  await db.Project.findOneAndDelete({ owner: userId, _id: projectId }).exec();
};

export default deleteService;
