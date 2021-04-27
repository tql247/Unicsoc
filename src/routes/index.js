const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");

router.get('/', auth, (req, res) => {
// router.get('/', (req, res) => {
//     req["user_profile"] = {
//         email: 'toitenlalinh9xpro@gmail.com',
//         password: '$2a$10$HKTfMlPfcSW08y0J21BzaeRNRRJKYcfq01F2AqkNPbb94VN7mjj.m',
//         full_name: 'Lian',
//         google_avatar: 'https://lh3.googleusercontent.com/a-/AOh14GgRu9Fj3nBP-CZo6qr8D_DoW6RTrks4gwTxXnq0Fw=s96-c',
//         role: 'student'
//     }
    const full_name = req["user_profile"]["full_name"]
    const email = req["user_profile"]["email"]
    const avatar = req["user_profile"]["avatar"]
    const google_avatar = req["user_profile"]["google_avatar"]
    const falcuty = req["user_profile"]["falcuty"] || ""
    const class_id = req["user_profile"]["class_id"] || ""
    return res.render('index', {email, full_name, avatar, google_avatar, falcuty, class_id})
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