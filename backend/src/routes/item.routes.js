import { Router } from 'express';
import { getItem, getUserCart, deleteItem, updateItem, addToCart } from '../controllers/item.controller.js';
import authenticate from '../middlewares/auth.middleware.js';
import csrfProtection from '../config/csrf.config.js';

const itemRouter = Router();

itemRouter.get('/user/:id', authenticate, getUserCart);

itemRouter.get('/:id', authenticate, getItem);

itemRouter.post('', csrfProtection, authenticate, addToCart);

itemRouter.delete('/:id', authenticate, deleteItem);

itemRouter.patch('/:id', csrfProtection, authenticate, updateItem);

export default itemRouter;