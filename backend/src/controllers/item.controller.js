import Item from "../models/item.model.js";

export const getUserCart = async (req, res, next) => {
    try {
        const items = await Item.find({ userId:req.params.id }).populate('productId', 'title').lean();

        if ( items.length === 0 ) {
            const error = new Error('No products added to cart yet');
            error.statusCode = 404;
            throw error;
        }

        return res.status(200).json({
            success: true,
            data: items
        });

    } catch (error) {
        next(error);
    }
};

export const getItem = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id).populate('productId').lean(); // populate the product with all fields

        if (!item) {
            const error = new Error('Item not found');
            error.statusCode = 404;
            throw error;
        }

        return res.status(200).json({ 
            success: true,
            data: item
        });
    } catch (error) {
        next(error);
    }
};

export const updateItem = async (req, res, next) => {
    try {
        const item = await Item.findByIdAndUpdate( req.params.id, req.body, { new: true });

        if (!item) {
            const error = new Error('Item not found');
            error.statusCode = 404;
            throw error;
        }

        return res.status(200).json({ success: true, data: item });
    } catch (error) {
        next(error);
    }
};

export const deleteItem = async (req, res, next) => {
    try {
        const item = await Item.findByIdAndDelete( req.params.id );

        if (!item) {
            const error = new Error('Item not found or failed to delete the item');
            error.statusCode = 404;
            throw error;
        }

        return res.status(200).json({ success: true, message: "Item deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity, status } = req.body;
        const item = await Item.create({ productId: productId, quantity: quantity, userId: req.user._id, status: status || 'on_hold' });

        if (!item) {
            const error = new Error('Failed to create item');
            error.statusCode = 400;
            throw error;
        }

        return res.status(200).json({ success: true, data: item });

    } catch (error) {
        next(error);
    }
};