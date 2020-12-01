export interface Project {
  _id?: string;
  platform: 'node' | 'express' | 'javascript' | 'react';
  owner: string;
  admins?: string[];
  members?: string[];
  projectName: string;
  issues?: string[];
}
