import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        status:{
            type: String,
            required: true,
            enum: [
                'pending', // the item is being proccessed before shipping
                'ordered', // the user has ordered the item
                'shipping', // the item is shipped, i.e it's on it's way
                'delivered', // the item is delivered to the user
                'on_hold' // the item is in the cart but not ordered yet
            ],
            default: 'on_hold'
        }
    },
    {
        timestamps: true
    }
);

itemSchema.index({ userId:1, status: 1});

const Item = mongoose.model('Item', itemSchema);

export default Item;