import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 50,
            trim: true
        },
        description: {
            type: String,
            required: true,
            minLength: 10,
            maxLength: 300,
            trim: true
        },
        category: { // for simplicity a product can only have one category
            type: String,
            required: true,
            minLength: 3,
            maxLength: 20,
            trim: true
        },
        stockAmount: {
            type: Number,
            required: [true, 'Product must have an amount'],
            min: 0,
        },
        price: {
            type: Number,
            required: [true, 'Product must have a positive price'],
            min: 0.1,
        },
        discount: {
            type: Number, // discount percentage
            required: false,
            min: 0,
            max: 100,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;