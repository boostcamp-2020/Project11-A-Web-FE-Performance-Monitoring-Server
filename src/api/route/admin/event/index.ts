import { Router } from 'express';
import Controller from './controller';
import passportMiddleware from '@middlewares/passportJwt';

const router = Router();

router.use(passportMiddleware);

router.get('/:eventId', Controller.getEvent);

export default router;
