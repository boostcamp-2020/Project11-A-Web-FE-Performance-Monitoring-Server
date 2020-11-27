import db from '@models';
import { Project } from '@interfaces/project';

interface ProjectWithRole extends Project {
  role: string;
}

const get = async (_id: string, pid: string): Promise<ProjectWithRole> => {
  try {
    const targetProject = await db.Project.findOne({
      _id: pid,
      $or: [{ owner: _id }, { admins: _id }, { members: _id }],
    });
    if (!targetProject) {
      throw new Error('찾는 프로젝트가 없습니다.');
    }
    if (targetProject.admins && targetProject.admins.includes(_id)) {
      return { ...targetProject, role: 'admin' };
    } else if (targetProject.members && targetProject.members.includes(_id)) {
      return { ...targetProject, role: 'member' };
    } else {
      return { ...targetProject, role: 'owner' };
    }
  } catch (err) {
    throw new Error(err);
  }
};

export default get;
