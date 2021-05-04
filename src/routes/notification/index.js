const express = require('express');
const post_notification = require("../../services/post_notification");
const view_all_notification = require("../../services/view_notifications");
const {auth} = require("../../middlewares/auth");
const router = express.Router();

router.get('/', auth, async function (req, res) {
    try {
        const notification_list = await view_all_notification(1, null)
        const user = req["user_profile"]
        console.log(notification_list)
        return res.render('notification/notification', {notification_list, user});
    } catch (e) {
        throw e
    }
})

router.get('/all/:index', async function (req, res, next) {
    try {
        const { index } = req.params;
        res.send("await get_all_notification(index)");
    } catch (e) {
        next(e)
    };
})

router.post('/post', auth,  async function (req, res, next) {
    try {
        const notification = {
            notification_title,
            notification_content,
            notify_topic
        } = req.body;
        const uploader = req["user_profile"]._id
        res.send({
            status: 200,
            data: await post_notification(notification, uploader)
        });
    } catch (e) {
        next(e)
    }
})

router.post('/get',  async function (req, res, next) {
    try {
        res.send({
            status: 200,
            data: "OK"
        })
    } catch (e) {
        next(e)
    }
})

module.exports = router;