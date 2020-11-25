import { Response, Request } from 'express';
import authService from '@services/auth';

const join = async (req: Request, res: Response): Promise<void> => {
  const userInfo = req.body;
  await authService.join(userInfo);
  return res.status(201).end();
};

const login = (req: Request, res: Response): Response<void> => {
  return res.json({
    user: req.user,
  });
};

export default { join, login };
