import { Router } from 'express';
import Controller from './controller';
import passportMiddleware from '@middlewares/passportJwt';

const router = Router();

router.use(passportMiddleware);

router.get('/list/:projectId', Controller.getIssues);
router.get('/:issueId', Controller.getIssue);
router.patch('/', Controller.changeIssuesStatus);

export default router;
