const ErrorHandler = async (err, req, res, next) => {
    console.error(err);
    // if (!err.status || err.status < 100 || err.status > 999) err.status = 500;

    return res.status(err.status).json({
        name: err.name,
        message: err.message,
        check: "admin"
    });
};

module.exports= ErrorHandler