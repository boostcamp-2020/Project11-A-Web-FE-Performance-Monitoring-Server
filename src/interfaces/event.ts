export interface Event {
  _id: string;
  issueId: string;
  timeStamp: Date;
  createdBy: {
    ip: string;
    email?: string;
    userId?: string;
  };
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
}
