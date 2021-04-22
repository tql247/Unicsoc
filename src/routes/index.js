const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index')
})

const admin = require('./admin');
router.use('/admin', admin);

const user = require('./user');
router.use('/user', user);

const test = require('./test');
router.use('/test', test);

const notification = require('./notification');
router.use('/notification', notification);

module.exports = router;