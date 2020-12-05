import { Types } from 'mongoose';

export interface Issue {
  _id: string | Types.ObjectId;
  projectId: string;
  errorName?: string;
  errorMessage?: string;
  errorStack?: string;
  message?: string;
  isResolved: boolean;
  comments?: Array<string>;
  events: Array<string>;
}
