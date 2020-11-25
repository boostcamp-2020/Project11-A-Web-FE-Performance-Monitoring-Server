export interface Project {
  _id: string;
  platfrom: string;
  owner: number;
  admin?: string[];
  member?: string[];
  projectName: string;
  issues?: string[];
}
