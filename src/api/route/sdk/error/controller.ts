import catchErrorService from '@services/sdk/catchError';
import { Response, NextFunction } from 'express';
import { SDKRequest } from '@interfaces/express/sdkRequest';

const catchError = async (
  req: SDKRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const event = req.body;
    const { project } = req;
    if (!project) {
      return next(new Error('토큰이 없습니다.'));
    }
    await catchErrorService(event, project);
    return res.status(201).end();
  } catch (error) {
    next(new Error(error));
  }
};

export default { catchError };
