const verify_admin = async (req, res, next) => {
    try {
        console.log('---------------')
        if (req["user_profile"].role !== "admin") {
            const e = new Error();
            e.status = 401;
            e.name = "Permission denies";
            e.message = "Your login account do not have permission to access this site"
            throw e;
        }
        return next();
    } catch (error) {
        return next(error);
    }
};

module.exports = verify_admin;