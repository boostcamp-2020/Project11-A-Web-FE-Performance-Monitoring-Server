import { Response, Request, NextFunction } from 'express';

import authService from '@services/auth/signup';
import loginService from '@services/auth/login';
import checkEmailService from '@services/auth/checkEmail';
import githubService from '@services/auth/githubHandler';

const join = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const userInfo = req.body;
  try {
    await authService.join(userInfo);
    return res.status(201).end();
  } catch (err) {
    next(new Error(err));
  }
};

const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<any> | void> => {
  const { email, pwd } = req.body;
  try {
    const user = await loginService(email, pwd);
    return res.status(200).json(user);
  } catch (err) {
    return next(new Error(err));
  }
};

const checkEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response<void>> => {
  try {
    const checkResult = await checkEmailService.checkEmail(req.body.email);
    if (checkResult) {
      return res.status(200).end();
    } else {
      throw '이미 존재하는 이메일 입니다.';
    }
  } catch (err) {
    next(new Error(err));
  }
};

const githubLogin = (req: Request, res: Response): void => {
  return res.redirect(githubService.githubURL);
};

const githubCallback = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<void> | void> => {
  try {
    const { code } = req.query;
    if (typeof code !== 'string') {
      throw new Error('code query가 올바르지 않습니다.');
    }
    const user = await githubService.githubCallback(code);
    return res.status(200).json(user);
  } catch (err) {
    next(new Error(err));
  }
};

const tokenCheck = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<void> | void> => {
  try {
    return res.status(200).json(req.user);
  } catch (err) {
    next(new Error(err));
  }
};

export default {
  join,
  login,
  checkEmail,
  githubLogin,
  githubCallback,
  tokenCheck,
};
