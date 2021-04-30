const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");

router.get('/', auth, async (req, res) => {
// router.get('/', (req, res) => {
//     req["user_profile"] = {
//         email: 'toitenlalinh9xpro@gmail.com',
//         password: '$2a$10$HKTfMlPfcSW08y0J21BzaeRNRRJKYcfq01F2AqkNPbb94VN7mjj.m',
//         full_name: 'Lian',
//         google_avatar: 'https://lh3.googleusercontent.com/a-/AOh14GgRu9Fj3nBP-CZo6qr8D_DoW6RTrks4gwTxXnq0Fw=s96-c',
//         role: 'student'
//     }
    const user = req["user_profile"]
    const feed_list = await view_feeds(1, null)
    return res.render('index', {user, feed_list})
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
const view_feeds = require("../services/view_feeds");
router.use('/notification', notification);

module.exports = router;