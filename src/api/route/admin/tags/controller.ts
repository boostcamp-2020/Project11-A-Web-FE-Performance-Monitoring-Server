import { Request, Response, NextFunction } from 'express';
import getStatisticService from '@services/tags/getStatistics';

const getTags = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response<void>> => {
  try {
    const { issueId } = req.params;
    const tag = await getStatisticService(issueId);
    return res.json(tag);
  } catch (err) {
    next(new Error(err));
  }
};

export default { getTags };
