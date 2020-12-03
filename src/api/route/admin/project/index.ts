import { Router } from 'express';

import Controller from './controller';
import passportMiddleware from '@middlewares/passportJwt';

const router = Router();

router.use(passportMiddleware);

router.get('/mailtest', Controller.mailTest);
router.get('/:projectId', Controller.getProject);
router.get('/', Controller.getProjects);

router.post('/', Controller.createProject);

router.put('/:projectId', Controller.updateProject);

export default router;
