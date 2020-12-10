import { Response, Request, NextFunction } from 'express';

import getEventService from '@services/event/getEvent';
import getEventsService from '@services/event/getEvents';
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

const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const { query } = req;
  const { issueId } = req.params;
  let { page, limit } = query;
  if (typeof page !== 'string') {
    page = '1';
  }
  if (typeof limit !== 'string') {
    limit = '10';
  }
  delete query.page;
  delete query.limit;
  try {
    const eventList = await getEventsService(issueId, query, {
      page: parseInt(page),
      limit: parseInt(limit),
    });
    return res.json(eventList);
  } catch (err) {
    next(new Error(err));
  }
};

export default { getEvent, getEvents };
