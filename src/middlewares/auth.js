const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const cookie = req.cookies
        if (!cookie) {
            const err = new Error()
            err.status = 400;
            err.name = "Bad request"
            err.message = "Invalid access to specific url"
            return next(err);
        }

        const token = cookie["jwt"].token
        const data = jwt.verify(token, process.env.JWT_KEY);

        if (!data) {
            const err = new Error('Unauthorized');
            err.status = 401;
            return next(err);
        }
        req.user_profile = data;
        return next();
    } catch (error) {
        return next(error);
    }
};

module.exports = auth;