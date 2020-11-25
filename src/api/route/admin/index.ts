import authRouter from './auth';
import { Router } from 'express';

const router = Router();

router.use('/auth', authRouter);

export default router;
