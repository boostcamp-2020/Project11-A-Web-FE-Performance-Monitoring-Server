export interface Project {
  _id?: string;
  platfrom: string;
  owner: string;
  admins?: string[];
  members?: string[];
  projectName: string;
  issues?: string[];
}
