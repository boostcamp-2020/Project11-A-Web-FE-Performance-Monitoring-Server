import { Router } from 'express';
import sdkRouter from './sdk';

const router = Router();

router.use('/sdk', sdkRouter);
// router.use('/api');

export default router;
