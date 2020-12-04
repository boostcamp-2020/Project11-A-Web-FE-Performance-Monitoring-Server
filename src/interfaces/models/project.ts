import { Types } from 'mongoose';

export interface Project {
  _id?: string | Types.ObjectId;
  platform: string;
  owner: string;
  admins?: string[];
  members?: string[];
  projectName: string;
  issues?: string[];
  emails?: string[];
}
