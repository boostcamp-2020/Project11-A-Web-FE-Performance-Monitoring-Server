import { Project } from "./project";

export interface User {
  id: number | null;
  email: string;
  pwd: string;
  projectIds: Array<Project>;
}
