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
            enum: ['pending', 'ordered', 'shipped', 'on_its_way', 'delivered', 'on_hold'],
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