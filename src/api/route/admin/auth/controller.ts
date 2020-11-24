import { Response, Request } from 'express';
import authService from '@services/auth';

const join = async (req: Request, res: Response): Promise<void> => {
  const userInfo = req.body;
  try {
    await authService.join(userInfo);
    return res.status(201).end();
  } catch (err) {
    throw new Error(err);
  }
};

const login = (req: Request, res: Response): Response<void> => {
  return res.json({
    user: req.user,
  });
};

export default { join, login };
