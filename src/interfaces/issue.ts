export default interface issue {
  _id: string;
  devMode: string;
  projectId: number;
  error: Error;
  sdk: {
    version: string;
    name: string;
  };
  isResolved: boolean;
  comments?: Array<number>;
  events: Array<number>;
  timeStamp: Date;
}
