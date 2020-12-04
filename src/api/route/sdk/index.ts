import errorRouter from './error';
import { Router } from 'express';

const router = Router();

router.use('/error', errorRouter);

export default router;
