import { StackTrace } from '@root/interfaces/stackTrace';

export interface Event {
  _id?: string;
  issueId?: string;
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
  platform?: string;
  sdk: {
    version: string;
    name: string;
  };
  url?: string;
  type?: string; // error.name
  value?: string; // error.message
  stacktrace?: StackTrace[]; // error.stack
  context?: string[];
  runtime?: {
    version: string;
    name: string;
  };
  serverName?: string;
  transaction?: string;
  userIp?: string;
}
