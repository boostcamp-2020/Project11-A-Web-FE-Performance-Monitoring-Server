import { Router } from 'express';

import Controller from './controller';
import passportMiddleware from '@middlewares/passportJwt';

const router = Router();

router.use(passportMiddleware);

router.get('/mailtest', Controller.mailTest);
router.get('/:projectId', Controller.getSDKToken);
router.post('/', Controller.createProject);
router.get('/', Controller.getProjects);

export default router;
