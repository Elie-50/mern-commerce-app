import { Router } from 'express';
import authRouter from './auth.routes.js';
import csrfRouter from './csrf.routes.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/csrf', csrfRouter);

export default router;