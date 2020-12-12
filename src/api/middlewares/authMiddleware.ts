import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '@interfaces/models/user';
import tokenConfig from '@config/passport';
import db from '@models';

const userTokenVerify = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).end();
    }
    const [tokenType, token]: string[] = req.headers.authorization.split(' ');
    if (tokenType.toLowerCase() !== 'bearer') {
      return res.status(401).end();
    }
    const user = jwt.verify(token, tokenConfig.secretOrKey) as User;
    const userData = await db.User.findById(user._id);
    if (!userData) {
      return next(new Error('올바르지 않은 토큰입니다.'));
    }
    req.user = userData;
    return next();
  } catch (err) {
    next(new Error(err));
  }
};

export default userTokenVerify;