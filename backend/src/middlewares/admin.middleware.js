export const authoriseAdminsOnly = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user || user.isAdmin === undefined || !user.isAdmin) {
            const error = new Error('User is not authorized to access this resource');
            error.statusCode = 403;

            throw error;
        }

        next();
    } catch (error) {
        next(error);
    }
}