import { Router, Request, Response } from 'express';
import passport from 'passport';

import Controller from './controller';
import emailValidation from '@middlewares/emailValidation';
import pwdValidation from '@middlewares/pwdValidation';

const router = Router();

router.post('/join', emailValidation, pwdValidation, Controller.join);
router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  Controller.login,
);
router.post('/checkEmail', emailValidation, (req: Request, res: Response) =>
  res.status(200).end(),
);

export default router;
