import { Router } from 'express';

import Controller from './controller';
import authMiddleware from '@middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/:issueId', Controller.getTags);

export default router;
