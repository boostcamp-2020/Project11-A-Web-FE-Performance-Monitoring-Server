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
  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  const [tokenType, token]: string[] = req.headers.authorization.split(' ');
  if (tokenType !== 'Bearer') {
    return res.status(400).end();
  }
  const projectId = jwt.verify(token, tokenConfig.secretOrKey);
  const project = await db.Project.findById(projectId);
  if (!project) {
    return next(new Error('올바르지 않은 토큰입니다.'));
  }
  req.project = project;
  return next();
};

export default sdkTokenVerify;
