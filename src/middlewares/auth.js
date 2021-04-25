const jwt = require('jsonwebtoken');
const get_account_data = require("../services/get_account_data");

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

        if (!cookie["jwt"]) {
            const err = new Error();
            err.name = 'Unauthorized'
            err.status = 401;
            return next(err);
        }

        const token = cookie["jwt"]
        const data = jwt.verify(token, process.env.JWT_KEY);

        if (!data) {
            const err = new Error('Unauthorized');
            err.status = 401;
            return next(err);
        }

        req.user_profile = await get_account_data(data.email);

        return next();
    } catch (error) {
        return next(error);
    }
};

module.exports = auth;