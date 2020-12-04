import db from '@models';
import { Document, PaginateResult } from 'mongoose';
import { Project } from '@interfaces/models/project';
import Option from '@interfaces/pageOption';

const get = async (
  _id: string,
  option: Option,
): Promise<PaginateResult<Project & Document>> => {
  try {
    const projectList = await db.Project.paginate(
      { $or: [{ owner: _id }, { admins: _id }, { members: _id }] },
      {
        ...option,
        sort: { createdAt: -1 },
        populate: ['owner', 'admins', 'members'],
      },
    );
    return projectList;
  } catch (err) {
    throw new Error(err);
  }
};

export default get;
