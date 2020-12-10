import catchEventService from '@root/services/sdk/catchEvent';
import { Response, NextFunction } from 'express';
import { SDKRequest } from '@interfaces/express/sdkRequest';

const catchEvent = async (
  req: SDKRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    let event = req.body;
    if (event.error) {
      event = { ...event, ...event.error };
      delete event.error;
    }
    const { project } = req;
    if (!project) {
      return next(new Error('토큰이 없습니다.'));
    }
    await catchEventService(event, project);
    return res.status(201).end();
  } catch (error) {
    next(new Error(error));
  }
};

export default { catchEvent };
