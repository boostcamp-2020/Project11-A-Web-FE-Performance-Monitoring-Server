import { Types } from 'mongoose';

export interface Issue {
  _id: string | Types.ObjectId;
  projectId: string;
  eventName?: string;
  errorMessage?: string;
  errorStack?: string;
  issueType: string;
  isResolved: boolean;
  comments?: Array<string>;
  events: Array<string>;
}
