import { Router } from 'express';
import Controller from './controller';
import passportMiddleware from '@middlewares/passportJwt';

const router = Router();

router.use(passportMiddleware);

router.post('/', Controller.createComment);
router.delete('/:commentId', Controller.deleteComment);
router.patch('/:commentId', Controller.updateComment);

export default router;
