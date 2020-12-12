import { Router } from 'express';
import Controller from './controller';
import authMiddleware from '@middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/list/:issueId', Controller.getEvents);
router.get('/:eventId', Controller.getEvent);

export default router;
