const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('OK')
})

const user = require('./user');
router.use('/user', user);

const test = require('./test');
router.use('/test', test);

module.exports = router;