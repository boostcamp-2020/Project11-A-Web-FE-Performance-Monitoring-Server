import { Router } from 'express';

import Controller from './controller';
import authMiddleware from '@middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/:projectId', Controller.getProject);
router.get('/', Controller.getProjects);

router.post('/', Controller.createProject);

router.put('/:projectId', Controller.updateProject);

router.delete('/:projectId', Controller.deleteProject);

export default router;
