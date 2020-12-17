import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SDKRequest } from '@interfaces/express/sdkRequest';
import tokenConfig from '@config/passport';
import db from '@models';

const sdkTokenVerify = async (
  req: SDKRequest,
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
    const projectId = jwt.verify(token, tokenConfig.secretOrKey);
    const project = await db.Project.findById(projectId);
    if (!project) {
      throw '올바르지 않은 토큰입니다.';
    }
    req.project = project;
    return next();
  } catch (err) {
    next(new Error(err));
  }
};

export default sdkTokenVerify;
