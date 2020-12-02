import db from '@models';
import { PaginateResult, Document } from 'mongoose';
import { Project } from '@interfaces/project';

interface options {
  page: number;
}

const getIssues = async (
  _id: string,
  projectId: string,
  { page }: options,
): Promise<PaginateResult<Project & Document>> => {
  try {
    const projectIssues = await db.Project.paginate(
      { _id: projectId },
      { page, populate: 'issues' },
    );

    if (!projectIssues) {
      throw new Error('이슈가 없습니다.');
    }
    return projectIssues;
  } catch (error) {
    throw new Error(error);
  }
};

export default { getIssues };
