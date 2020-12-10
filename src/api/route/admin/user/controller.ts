import { Request, Response, NextFunction } from 'express';
import getService from '@services/user/getUsers';
import { UserToken } from '@interfaces/userToken';
import updateProfileService from '@services/user/updateProfile';

const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response<void>> => {
  try {
    const { nickname } = req.params;
    let { page, limit } = req.query;
    if (typeof page !== 'string') {
      page = '1';
    }
    if (typeof limit !== 'string') {
      limit = '10';
    }
    const userList = await getService(nickname, {
      page: parseInt(page),
      limit: parseInt(limit),
    });
    return res.json(userList);
  } catch (err) {
    next(new Error(err));
  }
};

const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response<void>> => {
  try {
    return res.json(req.user);
  } catch (err) {
    next(new Error(err));
  }
};

const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response<void>> => {
  try {
    const { _id } = req.user as UserToken;
    const { nickname } = req.body;
    await updateProfileService(_id, nickname);
    return res.status(200).end();
  } catch (err) {
    next(new Error(err));
  }
};

export default { getUsers, getUser, updateProfile };
