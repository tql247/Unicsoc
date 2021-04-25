const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");

router.get('/', auth, (req, res) => {
    const full_name = req.user_profile["full_name"]
    const email = req.user_profile["email"]
    const avatar = req.user_profile["avatar"]
    const google_avatar = req.user_profile["google_avatar"]
    res.render('index', {email, full_name, avatar, google_avatar})
})

const admin = require('./admin');
router.use('/admin', admin);

const user = require('./user');
router.use('/user', user);
//
// const test = require('./test');
// router.use('/test', test);

const feed = require('./feed');
router.use('/feed', feed);

const notification = require('./notification');
router.use('/notification', notification);

module.exports = router;