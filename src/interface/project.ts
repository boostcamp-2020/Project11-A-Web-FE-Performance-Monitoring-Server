import { User } from "./user";

export interface Project {
  id: number | null;
  platfrom: string;
  owner: number; // 예 이상함 얘도 밑에꺼 생각하면 User 객체로 가져와야함
  admin: Array<User>;
  member: Array<User>;
  projectName: string;
  issues: Array<any>;
  createdAt: Date;
  updatedAt: Date;
}
