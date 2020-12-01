import { Request, Response, NextFunction } from 'express';

import { UserToken } from '@interfaces/userToken';
import createService from '@root/services/project/createProject';
import getService from '@root/services/project/getProjects';
import getProjectService from '@services/project/getProject';
import { ajv, validate } from '@utils/pageCheck';

const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response<void>> => {
  try {
    const { body, user } = req;
    const { _id } = user as UserToken;
    const projectInfo = { ...body, owner: _id };
    const token = await createService(projectInfo);
    return res.status(200).json({ token });
  } catch (err) {
    next(new Error(err));
  }
};

const getProjects = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response<void>> => {
  try {
    const valid = validate(req.query);
    if (!valid) {
      next(new Error(ajv.errorsText(validate.errors)));
    }
    const page = typeof req.query.page === 'string' ? req.query.page : '1';
    const { user } = req;
    const { _id } = user as UserToken;
    const projectList = await getService(_id, parseInt(page));
    return res.status(200).json(projectList);
  } catch (err) {
    next(new Error(err));
  }
};

const getProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response<void>> => {
  try {
    const { projectId } = req.params;
    const { user } = req;
    const { _id } = user as UserToken;
    const projectDetail = await getProjectService(_id, projectId);
    return res.status(200).json(projectDetail);
  } catch (err) {
    next(new Error(err));
  }
};

export default { createProject, getProjects, getProject };
