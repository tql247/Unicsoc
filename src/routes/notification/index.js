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
const view_notification_detail = require("../../services/view_notification_detail");
const list_topic = require("../../utils/dict_declare");

router.get('/', async function (req, res) {
    try {
        return res.redirect('/notification/1');
    } catch (e) {
        throw e
    }
})

router.get('/:index', auth, async function (req, res) {
    try {
        const notification_list = await view_all_notification(req.params["index"], null)
        const user = req["user_profile"]
        const notification_num = await get_num_notification()
        return res.render('notification/notification', {
            selectedTopic: null,
            list_topic,
            srcLink: req.originalUrl.replace(/([^\/]+$)/, ''),
            notification_list,
            user,
            notification_num,
            page_active: req.params["index"]
        });
    } catch (e) {
        throw e
    }
})

router.get('/:topic/:index', auth, async function (req, res) {
    try {
        const notification_list = await view_all_notification(req.params["index"], req.params["topic"])
        const user = req["user_profile"]
        const selectedTopic = req.params["topic"]
        const notification_num = await get_num_notification(req.params["topic"])
        return res.render('notification/notification', {
            selectedTopic,
            srcLink: req.originalUrl.replace(/([^\/]+$)/, ''),
            notification_list,
            user,
            notification_num,
            page_active: req.params["index"]
        });
    } catch (e) {
        throw e
    }
})

router.get('/detail/:topic/:id', auth, async function (req, res) {
    try {
        const notification_detail = await view_notification_detail(req.params["id"])
        const user = req["user_profile"]
        return res.render('notification/notification_detail', {notification_detail, user});
    } catch (e) {
        throw e
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