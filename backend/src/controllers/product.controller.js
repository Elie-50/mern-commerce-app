import Product from "../models/product.model.js";
import { paginateProducts } from "../services/product.service.js";

export const getProducts = async (req, res, next) => {
    try {
        const result = await paginateProducts(parseInt(req.params.page), parseInt(req.params.pageSize), null);

        if (!result.products) return res.status(404).json({
            success: false,
            message: "No products found"
        });

        return res.status(200).json({
            message: "Products found",
            data: result
        });

    } catch (error) {
        next(error);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            message: "Product retreived successfully",
            data: product
        });
    } catch (error) {
        next(error);
    }
};

export const getProductsByCategory = async (req, res, next) => {
    try {
        const { page, pageSize, category } = req.params;
        const result = await paginateProducts(parseInt(page), parseInt(pageSize), category);

        if (!result.products) {
            return res.status(404).json({
                success: false,
                message: "No products found for the desired category"
            });
        }

        return res.status(200).json({
            message: "Products found",
            data: result
        });
    } catch (error) {
        next(error);
    }
};

export const getCategories = async (req, res, next) => {
    try {
        const categories = await Product.find({}, 'category').distinct('category');

        if (!categories || categories.length === 0) {
            return res.status(404).json({ success: false, message: 'No categories found!' });
        }

        return res.status(200).json({
            success: true,
            data: categories,
            message: 'Categories search successful'
        })
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) return res.status(404).json({ success: false, message: 'Could not find the product' });

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const newData = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(id, newData);

        if (!updatedProduct) return res.status(404).json({ success: false, message: 'Could not find the product' });

        return res.status(200).json({
            success: true,
            message: "Product updated successfully"
        });
    } catch (error) {
        next(error)
    }
};

export const createProduct = async (req, res, next) => {
    try {
        const product = new Product(req.body);

        const newProduct = await product.save();

        if (!newProduct) return res.status(404).json({
            success: false,
            message: "Error while creating product"
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: newProduct
        });
    } catch (error) {
        next(error);
    }
};