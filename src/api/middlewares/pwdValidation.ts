import { Request, Response, NextFunction } from 'express';

// 최소 8 자, 대문자 하나 이상, 소문자 하나, 숫자 하나 및 특수 문자 하나 이상
const pwdPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;

const pwdValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!pwdPattern.test(req.body.pwd)) {
    return next(new Error('비밀번호 규칙이 다릅니다.'));
  }
  next();
};

export default pwdValidation;
