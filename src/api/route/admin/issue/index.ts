import { Router } from 'express';
import Controller from './controller';
import authMiddleware from '@middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/list/:projectId', Controller.getIssues);
router.get('/:issueId', Controller.getIssue);
router.patch('/', Controller.changeIssuesStatus);

export default router;
