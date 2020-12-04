export interface UserToken {
  projectIds: string[];
  _id: string;
  email: string;
  pwd: string;
  createAt: Date;
  updateAt: Date;
  __v: number;
  token: string;
}
