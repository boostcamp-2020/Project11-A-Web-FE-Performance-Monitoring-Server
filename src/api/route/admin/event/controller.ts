import { Response, Request, NextFunction } from 'express';

import getEventService from '@services/issue/getIssue';
import { UserToken } from '@interfaces/userToken';

const getEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const user = req.user as UserToken;
  const { eventId } = req.params;
  try {
    const targetEvent = await getEventService(user._id, eventId);
    return res.json(targetEvent);
  } catch (err) {
    next(new Error(err));
  }
};

export default { getEvent };
