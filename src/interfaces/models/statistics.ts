import { Types } from 'mongoose';

type AnyStringObject = {
  [K in string]: number;
};

export interface preStatistics {
  release?: string;
  environment?: string;
  sdk?: string;
  os?: string;
  browser?: string;
  url?: string;
  transaction?: string;
  userIp?: string;
  level?: string;
  serverName?: string;
  version?: string;
}

export interface Statistics {
  _id?: string | Types.ObjectId;
  issueId?: string | Types.ObjectId;
  release?: AnyStringObject;
  environment?: AnyStringObject;
  sdk?: AnyStringObject;
  os?: AnyStringObject;
  browser?: AnyStringObject;
  url?: AnyStringObject;
  transaction?: AnyStringObject;
  userIp?: AnyStringObject;
  level?: AnyStringObject;
  serverName?: AnyStringObject;
  version?: AnyStringObject;
}
