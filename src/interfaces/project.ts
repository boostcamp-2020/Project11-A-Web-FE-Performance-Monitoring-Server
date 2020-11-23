export interface Project {
  _id: string;
  platfrom: string;
  owner: number;
  admin?: Array<number>;
  member?: Array<number>;
  projectName: string;
  issues?: Array<number>;
  createdAt: Date;
  updatedAt: Date;
}
