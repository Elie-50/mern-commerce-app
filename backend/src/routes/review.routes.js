import { Router } from 'express';
import authenticate from '../middlewares/auth.middleware.js';
import csrfProtection from '../config/csrf.config.js';
import validateBody from '../validators/index.validator.js';
import { postReviewSchema, updateReviewSchema } from '../validators/review.validator.js';
import { 
    deleteReview,
    getProductReviews,
    getUserReviews,
    postReview,
    updateReview
} from '../controllers/review.controller.js';


const reviewRouter = Router();

reviewRouter.get('/user/:id', authenticate, getUserReviews);

reviewRouter.get('/product/:id', getProductReviews);

reviewRouter.post('', csrfProtection, authenticate, validateBody(postReviewSchema), postReview);

reviewRouter.delete('/:id', authenticate, deleteReview);

reviewRouter.patch('/:id', csrfProtection, authenticate, validateBody(updateReviewSchema), updateReview);

export default reviewRouter;