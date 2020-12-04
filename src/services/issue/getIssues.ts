import db from '@models';
import { PaginateResult, Document } from 'mongoose';
import { Issue } from '@interfaces/models/issue';
import Options from '@interfaces/pageOption';

const getIssues = async (
  _id: string,
  projectId: string,
  options: Options,
): Promise<PaginateResult<Issue & Document>> => {
  try {
    const Issues = await db.Issue.paginate({ projectId }, { ...options });

    if (!Issues) {
      throw new Error('이슈가 없습니다.');
    }
    return Issues;
  } catch (error) {
    throw new Error(error);
  }
};

export default { getIssues };
