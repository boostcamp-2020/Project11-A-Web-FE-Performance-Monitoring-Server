import db from '@models';
import { Document } from 'mongoose';
import { Statistics } from '@interfaces/models/statistics';

const getUsers = async (issueId: string): Promise<Statistics & Document> => {
  const Tag = await db.Statistics.findOne({ issueId });
  if (!Tag) {
    throw '존재하지 않는 이슈입니다.';
  }
  return Tag;
};

export default getUsers;
