import { Types } from 'mongoose';

export interface Comment {
  _id: string;
  userId: string | Types.ObjectId;
  description: string;
}
