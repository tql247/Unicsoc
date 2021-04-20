const express = require('express');
const handler = express.Router();

const not_found_url = (req, res) => {
    return res.type('txt').send('Not found');
}

const ErrorHandler = async (err, req, res, next) => {
    console.error("hehehehe");
    return res.status(err.status).json({
        name: err.name,
        message: err.message,
        check: "admin"
    });
};

handler.use(not_found_url)
handler.use(ErrorHandler)

module.exports = handler