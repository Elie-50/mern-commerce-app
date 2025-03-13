import Product from "../models/product.model";

export const paginateProducts = async (page, pageSize, category) => {

    try {

        page = page ?? 1;
        pageSize = pageSize ?? 10;

        if (isNaN(page) || isNaN(pageSize)) {
            const error = new Error('Page and page size should be a number');
            error.statusCode = 400;

            throw error;
        }

        if (page <= 0 || pageSize <= 0) {
            const error = new Error('Page and page size must be greater than zero');
            error.statusCode = 400;
            throw error;
        }

        const skip = (page - 1) * pageSize;

        const filter = category ? { category } : {};

        const products = await Product.find(filter).skip(skip).limit(pageSize).sort({ createdAt: -1 });
        
        const totalProducts = await Product.countDocuments(filter);

        const totalPages = Math.ceil(totalProducts / pageSize);

        return {
            products,
            totalProducts,
            totalPages,
            currentPage: page,
            pageSize
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
};