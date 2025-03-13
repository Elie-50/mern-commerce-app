import Joi from "joi";

// Schema for creating a product
export const postProductSchema = Joi.object({
    title: Joi.string().min(3).max(50).trim().required(),
    description: Joi.string().min(10).max(300).trim().required(),
    category: Joi.string().min(3).max(20).trim().required(),
    amount: Joi.number().min(0).required(),
    price: Joi.number().positive().required(),
    discount: Joi.number().min(0).max(100).default(0)
});

// Schema for updating a product
export const updateProductSchema = Joi.object({
    title: Joi.string().min(3).max(50).trim().optional(),
    description: Joi.string().min(10).max(300).trim().optional(),
    category: Joi.string().min(3).max(20).trim().optional(),
    amount: Joi.number().min(0).optional().when(Joi.ref('amount'), { is: Joi.exist(), then: Joi.number().min(0) }), // Only validate if provided
    price: Joi.number().positive().optional().when(Joi.ref('price'), { is: Joi.exist(), then: Joi.number().positive() }), // Validate only if exists
    discount: Joi.number().min(0).max(100).optional().default(0).when(Joi.ref('discount'), { is: Joi.exist(), then: Joi.number().min(0).max(100) }) // Validate if exists
});
