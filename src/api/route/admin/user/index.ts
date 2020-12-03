import { Router } from 'express';

import Controller from './controller';
import passportMiddleware from '@middlewares/passportJwt';

const router = Router();

router.use(passportMiddleware);

router.get('/:nickname', Controller.getUsers);
router.get('/', Controller.getUser);
router.patch('/', Controller.updateProfile);

export default router;
