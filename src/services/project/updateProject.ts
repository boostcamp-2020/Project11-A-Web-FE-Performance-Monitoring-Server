import db from '@models';
import { alertLevel } from '@utils/alertLevel';

interface MemberList {
  admins?: string[];
  members: string[];
  projectName?: string;
  alertLevel?: string;
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
  if (
    memberList.alertLevel &&
    memberList.alertLevel !== 'unsubscribe' &&
    !alertLevel.includes(memberList.alertLevel)
  ) {
    throw '설정된 레벨이 아닙니다.';
  }
  if (typeof targetProject.owner === 'string') {
    throw 'owner 타입이 다릅니다.';
  }
  if (targetProject.owner.equals(userId)) {
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
