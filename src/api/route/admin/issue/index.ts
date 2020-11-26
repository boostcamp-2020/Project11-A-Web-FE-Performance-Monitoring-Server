import { Router } from 'express';
import Controller from './controller';

const router = Router();

router.get('/', Controller.getIssues);

export default router;
