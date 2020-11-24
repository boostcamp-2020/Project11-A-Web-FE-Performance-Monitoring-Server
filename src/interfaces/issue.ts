export interface Issue {
  _id: string;
  devMode: string;
  projectId: string;
  error: string;
  isResolved: boolean;
  comments?: Array<string>;
  events: Array<string>;
}
