import db from '@models';
import { Project } from '@interfaces/models/project';
import { Document } from 'mongoose';

interface ProjectWithRole {
  info: Project & Document;
  role: string;
}

const get = async (
  _id: string,
  projectId: string,
): Promise<ProjectWithRole> => {
  const targetProject = await db.Project.findOne({
    _id: projectId,
    $or: [{ owner: _id }, { admins: _id }, { members: _id }],
  })
    .populate('issues')
    .populate({ path: 'owner', select: 'nickname' })
    .populate({ path: 'members', select: 'nickname' })
    .populate({ path: 'admins', select: 'nickname' })
    .exec();
  if (!targetProject) {
    throw '찾는 프로젝트가 없습니다.';
  }
  if (targetProject.admins && targetProject.admins.includes(_id)) {
    return { info: targetProject, role: 'admin' };
  } else if (targetProject.members && targetProject.members.includes(_id)) {
    return { info: targetProject, role: 'member' };
  } else {
    return { info: targetProject, role: 'owner' };
  }
};

export default get;
