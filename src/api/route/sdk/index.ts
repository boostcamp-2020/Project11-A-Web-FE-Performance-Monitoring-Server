import eventRouter from './error';
import { Router } from 'express';

const router = Router();

router.use('/event', eventRouter);

export default router;
