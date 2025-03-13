import { Router } from "express";
import validateBody from "../validators/index.validator.js";
import { postProductSchema, updateProductSchema } from "../validators/product.validator.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import csrfProtection from "../config/csrf.config.js";
import { authoriseAdminsOnly } from "../middlewares/admin.middleware.js";
import { 
    createProduct,
    deleteProduct,
    getCategories,
    getProductById,
    getProducts,
    getProductsByCategory,
    updateProduct
} from "../controllers/product.controller.js";

const productsRouter = Router();

// open routes
productsRouter.get('/:page/:pageSize', getProducts);

productsRouter.get('/:id', getProductById);

productsRouter.get('/categories', getCategories);

productsRouter.get('/:page/:pageSize/:category', getProductsByCategory);


// admins routes
productsRouter.post('', csrfProtection, authenticate, authoriseAdminsOnly, validateBody(postProductSchema), createProduct);

productsRouter.delete('/:id', authenticate, authoriseAdminsOnly, deleteProduct);

productsRouter.patch('/:id', csrfProtection, authenticate, authoriseAdminsOnly, validateBody(updateProductSchema), updateProduct);

export default productsRouter;