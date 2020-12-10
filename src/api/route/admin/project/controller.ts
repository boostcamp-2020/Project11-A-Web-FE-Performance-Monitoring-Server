import { Request, Response, NextFunction } from 'express';

import { UserToken } from '@interfaces/userToken';
import createService from '@root/services/project/createProject';
import getService from '@root/services/project/getProjects';
import getProjectService from '@services/project/getProject';
import createSDKToken from '@utils/createSDKToken';
import updateService from '@services/project/updateProject';
import deleteService from '@services/project/deleteProject';

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
    let { page, limit } = req.query;
    if (typeof page !== 'string') {
      page = '1';
    }
    if (typeof limit !== 'string') {
      limit = '10';
    }
    const { user } = req;
    const { _id } = user as UserToken;
    const projectList = await getService(_id, {
      page: parseInt(page),
      limit: parseInt(limit),
    });
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
    const { _id } = req.user as UserToken;
    const projectDetail = await getProjectService(_id, projectId);
    const token = createSDKToken(projectId);
    return res.status(200).json({
      ...projectDetail.info.toJSON(),
      role: projectDetail.role,
      sdkToken: token,
    });
  } catch (err) {
    next(new Error(err));
  }
};

const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response<void>> => {
  try {
    const { projectId } = req.params;
    let { admins, members } = req.body;
    const { projectName } = req.body;
    admins = admins ? admins : [];
    members = members ? members : [];
    const { _id } = req.user as UserToken;
    await updateService(_id, projectId, { admins, members, projectName });
    return res.status(200).end();
  } catch (err) {
    next(new Error(err));
  }
};

const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response<void>> => {
  try {
    const { projectId } = req.params;
    const { _id } = req.user as UserToken;
    await deleteService(_id, projectId);
    return res.status(200).end();
  } catch (err) {
    next(new Error(err));
  }
};

export default {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
};
