import { Types } from 'mongoose';

export interface User {
  _id: string | Types.ObjectId;
  email: string;
  nickname?: string;
  pwd: string;
  projectIds?: Array<number>;
}
