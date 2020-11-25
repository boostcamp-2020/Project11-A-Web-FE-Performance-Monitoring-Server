import { Request, Response, NextFunction } from 'express';

const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const emailValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!emailPattern.test(req.body.email)) {
    throw new Error('이메일 규칙이 다릅니다.');
  }
  next();
};

export default emailValidation;
