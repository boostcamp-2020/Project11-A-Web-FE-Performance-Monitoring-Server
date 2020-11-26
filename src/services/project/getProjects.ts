import db from '@models';
import { Document, PaginateResult } from 'mongoose';
import { Project } from '@interfaces/project';

const get = async (
  _id: string,
  page: number,
): Promise<PaginateResult<Project & Document>> => {
  try {
    const projectList = await db.Project.paginate(
      { $or: [{ owner: _id }, { admins: _id }, { members: _id }] },
      {
        page,
        limit: 10,
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
