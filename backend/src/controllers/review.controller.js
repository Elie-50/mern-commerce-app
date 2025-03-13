import Review from "../models/review.model.js";

// reviews user has posted
export const getUserReviews = async (req, res, next) => {
    try {
        const id = req.params.id;

        const reviews = await Review.find({ userId: id }).populate('productId title').lean();

        if (!reviews || reviews.length === 0 ) return res.status(404).json({
            success: false,
            message: 'User has not made any reviews yet'
        });

        return res.status(200).json({
            success: true,
            message: "User's reviews found",
            data: reviews
        });
    } catch (error) {
        next(error);
    }
};

export const getProductReviews = async (req, res, next) => {
    try {
        const productReviews = await Review.find({ productId:req.params.id }).populate('userId name').lean();

        if (!productReviews || productReviews.length === 0) return res.status(500).json({
            success: false,
            message: "Error fetching reviews"
        });

        return res.status(200).json({
            success: true,
            message: "Reviews fetched successfully",
            data: productReviews
        });
    } catch (error) {
        next(error);
    }
};

export const postReview = async (req, res, next) => {
    try {
        const review = new Review(req.body);

        const newReview = await review.save();

        if (!newReview) return res.status(400).json({
            success: false,
            message: "Error posting the review",
        });

        return res.status(201).json({
            success: true,
            message: "Review posted successfully",
            data: newReview
        });
    } catch (error) {
        next(error);
    }
};

export const deleteReview = async (req, res, next) => {
    try {

        const review = await Review.findById(req.params.id);

        if ( req.user.isAdmin || req.user._id.toString() === review.userId.toString() ) {
            
            const deletedReview = await review.deleteOne();

            if (!deletedReview) return res.status(400).json({
                success: false,
                message: "Failed to deleted review"
            });

            return res.status(200).json({
                success: true,
                message: "Review deleted successfully"
            });
        }
        
        return res.status(401).json({
            success: false,
            message: "User does not have permission to delete this review"
        });
    } catch (error) {
        next(error);
    }
};

export const updateReview = async (req, res, next) => {
    try {
        const review = await Review.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
             req.body,
            { new: true }
        );
        

        if (!review) return res.status(404).json({
            success: false,
            message: "Review not found or unauthorized access",
        });

        return res.status(200).json({
            success: true,
            message: "Review updated",
            data: review
        });
    } catch (error) {
        next(error)
    }
};

