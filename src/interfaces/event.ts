import { StackTrace } from '@root/interfaces/stackTrace';

export interface Event {
  _id?: string;
  issueId?: string;
  timeStamp: Date;
  createdBy: {
    ip: string;
    email?: string;
    userId?: string;
  };
  url?: string;
  type?: string;
  value?: string;
  stackTrace?: StackTrace[];
  platform: string;
  sdk: {
    version: string;
    name: string;
  };
  os?: {
    version: string;
    name: string;
  };
  browser?: {
    version: string;
    name: string;
  };
  context: string[];
}
