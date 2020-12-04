import { Request, Response, NextFunction } from 'express';

import { UserToken } from '@interfaces/userToken';
import createService from '@root/services/project/createProject';
import getService from '@root/services/project/getProjects';
import getProjectService from '@services/project/getProject';
import createSDKToken from '@utils/createSDKToken';

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
    return res.status(201).json({ token });
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
    const page =
      typeof req.query.page !== 'string'
        ? '1'
        : isNaN(+req.query.page)
        ? '1'
        : req.query.page;
    const { user } = req;
    const { _id } = user as UserToken;
    const projectList = await getService(_id, parseInt(page));
    return res.json(projectList);
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

const getSDKToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response<void>> => {
  try {
    const { projectId } = req.params;
    const { _id } = req.user as UserToken;
    await getProjectService(_id, projectId);
    const token = createSDKToken(projectId);
    return res.status(200).json({ token });
  } catch (err) {
    next(new Error(err));
  }
};

export default { createProject, getProjects, getProject, getSDKToken };
