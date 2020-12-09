import authRouter from './auth';
import issueRouter from './issue';
import projectRouter from './project';
import eventRouter from './event';
import commentRouter from './comment';
import userRouter from './user';
import tagRouter from './tags';
import { Router } from 'express';

const router = Router();

router.use('/auth', authRouter);
router.use('/issue', issueRouter);
router.use('/project', projectRouter);
router.use('/event', eventRouter);
router.use('/comment', commentRouter);
router.use('/user', userRouter);
router.use('/tag', tagRouter);

export default router;
