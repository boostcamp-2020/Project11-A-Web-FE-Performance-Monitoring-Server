import { Response, Request, NextFunction } from 'express';
import authService from '@root/services/auth/auth';
import checkEmailService from '@services/auth/checkEmail';

const join = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const userInfo = req.body;
  try {
    await authService.join(userInfo);
    return res.status(200).end();
  } catch (err) {
    next(new Error(err));
  }
};

const login = (req: Request, res: Response): Response<void> => {
  return res.json({
    ...req.user,
  });
};

const checkEmail = async (
  req: Request,
  res: Response,
): Promise<void | Response<void>> => {
  try {
    const checkResult = await checkEmailService.checkEmail(req.body.email);
    if (checkResult) {
      return res.status(200).end();
    } else {
      return res.status(400).json({ message: '이미 존재하는 이메일 입니다.' });
    }
  } catch (err) {
    throw new Error(err);
  }
};

export default { join, login, checkEmail };
