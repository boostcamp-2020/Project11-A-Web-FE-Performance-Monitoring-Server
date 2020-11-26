import { Request } from 'express';
import { Project } from '@interfaces/project';

export interface SDKRequest extends Request {
  project?: Project;
}
