export interface User {
  id: number | null;
  email: string;
  pwd: string;
  projectIds: Array<number>;
}
