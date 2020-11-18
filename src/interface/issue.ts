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
  comments: Array<number>;
  events: Array<number>;
  timeStamp: Date;
}
