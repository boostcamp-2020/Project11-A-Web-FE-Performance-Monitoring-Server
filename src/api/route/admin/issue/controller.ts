import { Response, Request, NextFunction } from 'express';

import issueService from '@services/issue/getIssues';
import getIssueService from '@services/issue/getIssue';
import { ajv, validate } from '@utils/pageCheck';
import { UserToken } from '@interfaces/userToken';

const getIssues = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const valid = validate(req.query);
  if (!valid) {
    next(new Error(ajv.errorsText(validate.errors)));
  }
  let { page } = req.query;
  if (typeof page !== 'string') {
    page = '1';
  }
  const result = await issueService.getIssues({ page: parseInt(page) });
  return res.json(result);
};

const getIssue = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const user = req.user as UserToken;
  const { issueId } = req.params;
  try {
    const targetIssue = await getIssueService(user._id, issueId);
    return res.json(targetIssue);
  } catch (err) {
    next(new Error(err));
  }
};

export default { getIssue, getIssues };
