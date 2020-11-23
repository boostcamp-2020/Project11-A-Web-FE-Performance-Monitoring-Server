import expressRouter from './express/index';
import reactRouter from './react';
import { Router } from 'express';

const router = Router();

router.use('/express', expressRouter);
router.use('/react', reactRouter);

export default router;
