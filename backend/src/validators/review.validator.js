import Joi from 'joi';

// Regular expression for MongoDB ObjectId validation
const objectIdPattern = /^[0-9a-fA-F]{24}$/;

export const postReviewSchema = Joi.object({
    userId: Joi.string().pattern(objectIdPattern).required().messages({
        'string.pattern.base': 'Invalid userId format. Must be a valid ObjectId.'
    }),
    productId: Joi.string().pattern(objectIdPattern).required().messages({
        'string.pattern.base': 'Invalid productId format. Must be a valid ObjectId.'
    }),
    rating: Joi.number().min(0).max(5).required().messages({
        'number.base': 'Rating must be a number.',
        'number.min': 'Rating must be between 0 and 5.',
        'number.max': 'Rating must be between 0 and 5.'
    }),
    comment: Joi.string().max(250).optional().messages({
        'string.max': 'Comment cannot exceed 250 characters.'
    })
});

export const updateReviewSchema = Joi.object({
    rating: Joi.number().min(0).max(5).optional().messages({
        'number.base': 'Rating must be a number.',
        'number.min': 'Rating must be between 0 and 5.',
        'number.max': 'Rating must be between 0 and 5.'
    }),
    comment: Joi.string().max(250).optional().messages({
        'string.max': 'Comment cannot exceed 250 characters.'
    })
});
