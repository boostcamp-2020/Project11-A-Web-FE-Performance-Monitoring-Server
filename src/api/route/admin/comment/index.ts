import { Router } from 'express';
import Controller from './controller';
import authMiddleware from '@middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/:issueId', Controller.getComments);
router.post('/', Controller.createComment);
router.delete('/:commentId', Controller.deleteComment);
router.patch('/:commentId', Controller.updateComment);

export default router;
