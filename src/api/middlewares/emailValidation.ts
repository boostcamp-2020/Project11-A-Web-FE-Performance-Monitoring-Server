import { Request, Response, NextFunction } from 'express';
import emailPattern from '@utils/emailCheck';

const emailValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!emailPattern.test(req.body.email)) {
    return next(new Error('이메일 규칙이 다릅니다.'));
  }
  next();
};

export default emailValidation;
