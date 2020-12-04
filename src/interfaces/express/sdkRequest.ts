import { Request } from 'express';
import { Project } from '@interfaces/models/project';

export interface SDKRequest extends Request {
  project?: Project;
}
