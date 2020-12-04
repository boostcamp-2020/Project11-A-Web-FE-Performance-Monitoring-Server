import { StackTrace } from '@root/interfaces/stackTrace';
import { Types } from 'mongoose';

export interface Event {
  _id?: string | Types.ObjectId;
  issueId?: string | Types.ObjectId;
  release?: string;
  environment?: string;
  timeStamp: Date;
  createdBy: {
    ipAdress?: string;
    email?: string;
  };
  os?: {
    version: string;
    name: string;
  };
  browser?: {
    version: string;
    name: string;
  };
  sdk: {
    version: string;
    name: string;
  };
  url?: string;
  type?: string; // error.name
  value?: string; // error.message
  stacktrace?: StackTrace[]; // error.stack
  context?: string[][];
  version?: string;
  platform?: string;
  serverName?: string;
  transaction?: string;
  userIp?: string;
}
