import Joi from 'joi';

const objectIdPattern = /^[0-9a-fA-F]{24}$/;
const statusEnum = ['pending', 'ordered', 'shipping', 'delivered', 'on_hold'];

export const itemSchema = Joi.object({
    userId: Joi.string().pattern(objectIdPattern).required().messages({
        'string.pattern.base': 'Invalid userId format. Must be a valid ObjectId.'
    }),
    productId: Joi.string().pattern(objectIdPattern).required().messages({
        'string.pattern.base': 'Invalid productId format. Must be a valid ObjectId.'
    }),
    quantity: Joi.number().min(1).required().message({
        'number.base': 'Quantity must be a number.',
        'number.min': 'Must add at least one item.'
    }),
    status: Joi.string().valid(...statusEnum).optional().message({
        'string.valid': 'status must be on of the following values' + statusEnum.toString() 
    })
});