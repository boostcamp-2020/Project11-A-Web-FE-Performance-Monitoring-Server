import db from '@models';
import { Project } from '@interfaces/project';

interface ProjectWithRole {
  info: Project;
  role: string;
}

const get = async (
  _id: string,
  projectId: string,
): Promise<ProjectWithRole> => {
  try {
    const targetProject = await db.Project.findOne({
      _id: projectId,
      $or: [{ owner: _id }, { admins: _id }, { members: _id }],
    }).populate(['owner', 'members', 'admins', 'issues']);
    if (!targetProject) {
      throw new Error('찾는 프로젝트가 없습니다.');
    }
    if (targetProject.admins && targetProject.admins.includes(_id)) {
      return { info: targetProject, role: 'admin' };
    } else if (targetProject.members && targetProject.members.includes(_id)) {
      return { info: targetProject, role: 'member' };
    } else {
      return { info: targetProject, role: 'owner' };
    }
  } catch (err) {
    throw new Error(err);
  }
};

export default get;
