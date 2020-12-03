import db from '@models';

type MemberList = {
  admins?: string[];
  members: string[];
  projectName?: string;
};

const updateProject = async (
  userId: string,
  projectId: string,
  memberList: MemberList,
): Promise<void> => {
  const targetProject = await db.Project.findOne({
    _id: projectId,
    $or: [{ owner: userId }, { admins: userId }],
  });
  if (!targetProject) {
    throw '권한이 없습니다.';
  }
  if (targetProject.owner === userId) {
    await db.Project.findByIdAndUpdate(projectId, {
      ...memberList,
    });
  } else {
    await db.Project.findByIdAndUpdate(projectId, {
      members: memberList.members,
    });
  }
  return;
};

export default updateProject;
