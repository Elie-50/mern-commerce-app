import { Router } from 'express';
import authRouter from './auth.routes.js';
import csrfRouter from './csrf.routes.js';
import productsRouter from './product.routes.js';
import reviewRouter from './review.routes.js';
import itemRouter from './item.routes.js';


const router = Router();

router.use('/auth', authRouter);
router.use('/csrf', csrfRouter);
router.use('/product', productsRouter);
router.use('/review', reviewRouter);
router.use('/item', itemRouter);

export default router;