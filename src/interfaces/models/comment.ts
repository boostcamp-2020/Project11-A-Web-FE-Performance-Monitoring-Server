import { Types } from 'mongoose';

export interface Comment {
  _id: string | Types.ObjectId;
  userId: string | Types.ObjectId;
  issueId: string | Types.ObjectId;
  description: string;
}
