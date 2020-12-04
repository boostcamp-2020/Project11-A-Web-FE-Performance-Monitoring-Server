import { Router } from 'express';
import sdkRouter from './sdk';
import adminRouter from './admin';

const router = Router();

router.use('/sdk', sdkRouter);
router.use('/api', adminRouter);

export default router;
