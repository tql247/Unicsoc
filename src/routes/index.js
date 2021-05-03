const express = require('express');
const router = express.Router();
const {auth} = require("../middlewares/auth");
const view_feeds = require("../services/view_feeds");
const role_redirect = require("../middlewares/role_redirect");

router.get('/', auth, role_redirect, async (req, res) => {
    const user = req["user_profile"]
    const feed_list = await view_feeds(1, null)
    return res.render('index', {user, feed_list})
})

const admin = require('./admin');
router.use('/admin', admin);

const user = require('./user');
router.use('/user', user);

const comment = require('./comment');
router.use('/comment', comment);

const feed = require('./feed');
router.use('/feed', feed);

const notification = require('./notification');
router.use('/notification', notification);

module.exports = router;