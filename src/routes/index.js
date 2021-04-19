const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res, ext) => {
    res.send('OK')
})

module.exports = router;