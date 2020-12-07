import { Response, Request, NextFunction } from 'express';

import issueService from '@services/issue/getIssues';
import getIssueService from '@services/issue/getIssue';
import { UserToken } from '@interfaces/userToken';
import changeIssuesStatusService from '@services/issue/changeIssueStatus';

const getIssues = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  let { page, limit } = req.query;
  if (typeof page !== 'string') {
    page = '1';
  }
  if (typeof limit !== 'string') {
    limit = '10';
  }
  const { projectId } = req.params;
  const { user } = req;
  const { _id } = user as UserToken;

  const result = await issueService.getIssues(_id, projectId, {
    page: parseInt(page),
    limit: parseInt(limit),
  });
  return res.json(result);
};

const getIssue = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const user = req.user as UserToken;
  const { issueId } = req.params;
  if (issueId === 'list') {
    return next(new Error('projectId를 입력하세요'));
  }
  try {
    const targetIssue = await getIssueService(user._id, issueId);
    return res.json(targetIssue);
  } catch (err) {
    next(new Error(err));
  }
};

const changeIssuesStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const user = req.user as UserToken;
  let { issueList } = req.body;
  if (!issueList) {
    return next(new Error('issueList가 없습니다.'));
  }
  if (typeof issueList === 'string') {
    issueList = [issueList];
  }
  try {
    await changeIssuesStatusService(user._id, issueList);
    return res.status(200).end();
  } catch (err) {
    next(new Error(err));
  }
};

export default { getIssue, getIssues, changeIssuesStatus };
