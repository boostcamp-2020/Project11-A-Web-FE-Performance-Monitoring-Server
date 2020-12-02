import { Request, Response, NextFunction } from 'express';

import { UserToken } from '@interfaces/userToken';
import createService from '@root/services/project/createProject';
import getService from '@root/services/project/getProjects';
import getProjectService from '@services/project/getProject';
import createSDKToken from '@utils/createSDKToken';

import { Project } from '@interfaces/models/project';
import sendMail from '@utils/sendMail';

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

const mailTest = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const a: Project = {
    platform: 'node',
    owner: '나야나!',
    projectName: '샘플이야!',
    emails: ['soos0228@naver.com', 'soos3121@gmail.com'],
  };
  await sendMail(a);
  return res.status(200).end();
};

export default {
  createProject,
  getProjects,
  getProject,
  getSDKToken,
  mailTest,
};
