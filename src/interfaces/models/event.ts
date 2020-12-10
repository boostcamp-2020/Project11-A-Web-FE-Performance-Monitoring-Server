import { StackTrace } from '@interfaces/models/stackTrace';
import { Types } from 'mongoose';

type AnyStringObject = {
  [K in string]: string;
};

export interface Event {
  _id?: string | Types.ObjectId;
  issueId?: string | Types.ObjectId;
  release?: string;
  environment?: string;
  timeStamp: Date;
  createdBy: {
    ipAddress?: string;
  };
  os?: {
    version?: string;
    name: string;
  };
  browser?: {
    version?: string;
    name: string;
  };
  sdk?: {
    version?: string;
    name: string;
  };
  url?: string;
  type?: string; // error.name
  value?: string; // error.message
  stackTrace?: StackTrace[]; // error.stack
  contexts?: {
    [K in string]: AnyStringObject;
  };
  version?: string;
  platform?: string;
  serverName?: string;
  transaction?: string;
  userIp?: string;
  message?: string; // log일 경우만
  level?: string;
  errorContexts?: ErrorContext[];
}
interface ErrorContext {
  preErrorContext?: string[];
  ErrorContext?: string[];
  postErrorContext?: string[];
}
