export interface Issue {
  _id: string;
  projectId: string;
  errorName: string;
  errorMessage: string;
  isResolved: boolean;
  comments?: Array<string>;
  events: Array<string>;
}
