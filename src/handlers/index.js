const not_found_url = (req, res) => {
    return res.type('txt').send('Not found');
}

const ErrorHandler = (err, req, res, next) => {
    console.log(Object.entries(err))

    if (err.name === "TokenExpiredError") {
        err.status = 401
    }

    return res.status(err.status).json({
        name: err.name,
        message: err.message
    });
};

module.exports = {
    not_found_url,
    ErrorHandler
}