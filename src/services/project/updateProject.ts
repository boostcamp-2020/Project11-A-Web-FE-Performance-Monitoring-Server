import db from '@models';

interface MemberList {
  admins?: string[];
  members: string[];
  projectName?: string;
}

const updateProject = async (
  userId: string,
  projectId: string,
  memberList: MemberList,
): Promise<void> => {
  const targetProject = await db.Project.findOne({
    _id: projectId,
    $or: [{ owner: userId }, { admins: userId }],
  }).exec();
  if (!targetProject) {
    throw '권한이 없습니다.';
  }
  if (targetProject.owner === userId) {
    await db.Project.findByIdAndUpdate(projectId, {
      ...memberList,
    }).exec();
  } else {
    await db.Project.findByIdAndUpdate(projectId, {
      members: memberList.members,
    }).exec();
  }
  return;
};

export default updateProject;
