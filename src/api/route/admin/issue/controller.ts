import { Response, Request, NextFunction } from 'express';

import issueService from '@root/services/issue/getIssues';
import { ajv, validate } from '@utils/pageCheck';

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

export default { getIssues };
