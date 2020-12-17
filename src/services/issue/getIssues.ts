import db from '@models';
import { PaginateResult, Document } from 'mongoose';
import { Issue } from '@interfaces/models/issue';
import Options from '@interfaces/pageOption';

const getIssues = async (
  _id: string,
  projectId: string,
  options: Options,
): Promise<PaginateResult<Issue & Document>> => {
  const Issues = await db.Issue.paginate(
    { projectId, isResolved: false },
    { ...options, sort: { createdAt: -1 } },
  );
  return Issues;
};

export default { getIssues };
