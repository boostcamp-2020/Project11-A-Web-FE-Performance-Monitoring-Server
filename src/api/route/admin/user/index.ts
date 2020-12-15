import { Router } from 'express';

import Controller from './controller';
import authMiddleware from '@middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/:nickname', Controller.getUsers);
router.get('/', Controller.getUser);
router.patch('/', Controller.updateProfile);

export default router;
