import { User } from "./user";

export interface Event {
  id: number;
  issueId: number;
  timeStamp: Date;
  createdBy: User;
  tag: {
    os: string;
    osName: string;
    browser: string;
    browserName: string;
  };
}
