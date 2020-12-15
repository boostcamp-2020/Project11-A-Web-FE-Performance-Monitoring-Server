import { Router } from 'express';

import Controller from './controller';
import emailValidation from '@middlewares/emailValidation';
import pwdValidation from '@middlewares/pwdValidation';
import authMiddleware from '@middlewares/authMiddleware';

const router = Router();

router.post('/join', emailValidation, pwdValidation, Controller.join);
router.post('/login', Controller.login);
router.post('/checkEmail', emailValidation, Controller.checkEmail);
router.get('/tokenCheck', authMiddleware, Controller.tokenCheck);
router.get('/github', Controller.githubLogin);
router.get('/github/callback', Controller.githubCallback);

export default router;
