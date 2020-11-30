import { Router } from 'express';
import Controller from './controller';
import passportMiddleware from '@middlewares/passportJwt';

const router = Router();

router.use(passportMiddleware);

router.get('/:issueId', Controller.getIssue);
router.get('/', Controller.getIssues);

export default router;
