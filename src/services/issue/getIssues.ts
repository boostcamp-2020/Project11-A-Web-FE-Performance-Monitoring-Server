import db from '@models';
import mongoose from 'mongoose';
import { Issue } from '@interfaces/issue';

interface options {
  page: number;
}

const getIssues = async ({
  page,
}: options): Promise<mongoose.PaginateResult<Issue & mongoose.Document>> => {
  const result = await db.Issue.paginate({}, { page, limit: 10 });
  return result;
};

export default { getIssues };
