const express = require('express');
const post_notification = require("../../services/post_notification");
const view_all_notification = require("../../services/view_notifications");
const edit_notification = require("../../services/edit_notification");
const delete_notification = require("../../services/delete_notification");
const {auth} = require("../../middlewares/auth");
const router = express.Router();
const ejs = require('ejs');
const path = require("path");
const get_num_notification = require("../../services/get_num_notification");

router.get('/', auth, async function (req, res) {
    try {
        const notification_list = await view_all_notification(1, null)
        const user = req["user_profile"]
        return res.render('notification/notification', {notification_list, user});
    } catch (e) {
        throw e
    }
})

router.get('/:index', auth, async function (req, res) {
    try {
        const notification_list = await view_all_notification(req.params["index"], null)
        const user = req["user_profile"]
        const notification_num = await get_num_notification()
        return res.render('notification/notification', {srcLink: req.originalUrl.replace(/([^\/]+$)/, ''), notification_list, user, notification_num, page_active: req.params["index"]});
    } catch (e) {
        throw e
    }
})

router.get('/:topic/:index', auth, async function (req, res) {
    try {
        const notification_list = await view_all_notification(req.params["index"], null)
        const user = req["user_profile"]
        const notification_num = await get_num_notification(req.params["topic"])
        return res.render('notification/notification', {srcLink: req.originalUrl.replace(/([^\/]+$)/, ''), notification_list, user, notification_num, page_active: req.params["index"]});
    } catch (e) {
        throw e
    }
})


router.post('/view', auth, async function (req, res, next) {
    try {
        console.log('I want read more, bae')
        const you = req["user_profile"]
        const topic_filter = req.body["topic_filter"]
        const page_index = req.body["pageIndex"] || 1
        const notification_list = await view_all_notification(page_index, topic_filter)
        const template_path = path.join(process.cwd(), '/src/views/component/list_notification.ejs')
        const html_data = await ejs.renderFile(template_path, {notification_list: notification_list, user: you}, {async: true})
        return res.send({
            status: 200,
            data: html_data
        });
    } catch (e) {
        console.log(e)
        next(e)
    }
})

router.post('/post', auth,  async function (req, res, next) {
    try {
        const {
            notification_title,
            notification_content,
            notify_topic
        } = req.body;

        const notification = {
            notification_title,
            notification_content,
            notify_topic
        }
        const uploader = req["user_profile"]._id
        const q_notify = await post_notification(notification, uploader)
        const quick_notify_template = path.join(process.cwd(), '/src/views/component/quick_notify.ejs');
        const data = await ejs.renderFile(quick_notify_template, {q_notify}, {async: true})

        io.emit('new-notify', {
            data: data
        })

        res.send({
            status: 200,
            data: data
        });
    } catch (e) {
        next(e)
    }
})

router.post('/edit',  auth, async function (req, res, next) {
    try {
        const notification_edit = {
            edit_notification_id,
            edit_notification_title,
            edit_notification_content,
            edit_notify_topic
        } = req.body;
        const uploader = req["user_profile"]._id

        res.send({
            status: 200,
            data: await edit_notification(notification_edit, uploader)
        })
    } catch (e) {
        next(e)
    }
})

router.post('/delete',  auth, async function (req, res, next) {
    try {
        const {notification_id_delete} = req.body;
        const uploader = req["user_profile"]._id

        res.send({
            status: 200,
            data: await delete_notification(notification_id_delete, uploader)
        })
    } catch (e) {
        next(e)
    }
})

module.exports = router;