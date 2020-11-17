import { Comment } from "@interface/comment";
import { Event } from "@interface/event";

export interface issue {
  id: number;
  devMode: string;
  projectId: number;
  error: Error;
  sdk: {
    version: string;
    name: string;
  };
  isResolved: boolean;
  comments: Array<Comment>;
  events: Array<Event>;
  timeStamp: Date;
}
