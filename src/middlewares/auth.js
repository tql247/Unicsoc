const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        // const token = req
        //     .header('Authorization')
        //     .replace('Bearer ', '')
        //     .replace('bearer ', '');
        //
        // const data = jwt.verify(token, process.env.JWT_KEY);
        //
        // if (!data) {
        //     const err = new Error('Unauthorized');
        //     err.status = 401;
        //     return next(err);
        // }
        //
        // req.user = data;
        // req.token = data;
        return next();
    } catch (error) {
        return next(error);
    }
};

module.exports = auth;