import { Router } from 'express';
import passport from 'passport';

import Controller from './controller';
import emailValidation from '@middlewares/emailValidation';
import pwdValidation from '@middlewares/pwdValidation';
import passportMiddleware from '@middlewares/passportJwt';

const router = Router();

router.post('/join', emailValidation, pwdValidation, Controller.join);
router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  Controller.login,
);
router.post('/checkEmail', emailValidation, Controller.checkEmail);
router.get('/tokenCheck', passportMiddleware, Controller.tokenCheck);
router.get('/github', Controller.githubLogin);
router.get('/github/callback', Controller.githubCallback);

export default router;
