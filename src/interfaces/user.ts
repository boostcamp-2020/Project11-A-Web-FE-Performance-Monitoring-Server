export interface User {
  _id: string;
  email: string;
  pwd: string;
  projectIds?: Array<number>;
}
