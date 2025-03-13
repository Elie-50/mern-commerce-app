import { Router } from 'express';
import { signup, login, logout } from '../controllers/auth.controller.js';
import { loginSchema, signupSchema } from '../validators/user.validator.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import csrfProtection from '../config/csrf.config.js';
import validateBody from '../validators/index.validator.js';

const router = Router();

router.post('/signup', validateBody(signupSchema), csrfProtection, signup);
router.post('/login', validateBody(loginSchema), csrfProtection, login);
router.post('/logout', authenticate, logout);

export default router;
