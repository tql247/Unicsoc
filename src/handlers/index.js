const not_found_url = (req, res) => {
    return res.type('txt').send('Not found url');
}

const ErrorHandler = (err, req, res, next) => {
    console.log(Object.entries(err))

    if (err.name === "TokenExpiredError") {
        err.status = 401
    }

    if (!err.status) err.status = 400
    return res.status(err.status).json({
        name: err.name,
        message: err.message
    });
};

module.exports = {
    not_found_url,
    ErrorHandler
}