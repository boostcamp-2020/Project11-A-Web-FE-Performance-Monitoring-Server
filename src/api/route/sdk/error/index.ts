import { Router } from 'express';
import sdkMiddleware from '@middlewares/sdkMiddleware';

import controller from './controller';

const router = Router();

router.use(sdkMiddleware);

router.post('/', controller.catchError);

export default router;
