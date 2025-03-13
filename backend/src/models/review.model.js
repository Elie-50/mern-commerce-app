import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: [0, 'Rating must be at least 0'],
            max: [5, 'Rating cannot exceed 5'],
        },
        comment: {
            type: String,
            required: false,
            maxLength: 250
        }
    },
    {
        timestamps: true
    }
);

reviewSchema.index({ userId:1, productId: 1}, { unique: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;