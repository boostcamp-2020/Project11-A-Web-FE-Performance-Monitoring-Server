import { Router } from 'express';

import Controller from './controller';
import passportMiddleware from '@middlewares/passportJwt';

const router = Router();

router.use(passportMiddleware);

router.get('/:projectId', Controller.getProject);
router.post('/', Controller.createProject);
router.get('/', Controller.getProjects);

export default router;
