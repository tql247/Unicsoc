const express = require('express');
const post_a_feed = require("../../services/post_feed");
const uploader = require("../../middlewares/uploader");
const edit_feed = require("../../services/edit_feed");
const {auth} = require("../../middlewares/auth");
const router = express.Router();
const ejs = require('ejs');
const path = require("path");
const delete_feed = require("../../services/delete_feed");
const view_feeds = require("../../services/view_feeds");

router.get('/', async function (req, res) {
    res.send('feed');
})

router.post('/view', auth, async function (req, res, next) {
    try {
        console.log('I want more, bae')
        const you = req["user_profile"]
        const user_id = req.body["my_feed"] ? you._id : req.body["host_id"]
        const feed_index = req.body["feedIndex"] || 1
        const feed_list = await view_feeds(feed_index, user_id)
        const template_path = path.join(process.cwd(), '/src/views/component/feed_list_all.ejs')
        const html_data = await ejs.renderFile(template_path, {feed_list: feed_list, you: you}, {async: true})
        return res.send({
            status: 200,
            data: html_data
        });
    } catch (e) {
        console.log(e)
        next(e)
    }
})

router.post('/post', auth, uploader.single('feed_picture'), async function (req, res, next) {
    try {
        const you = req["user_profile"];
        const req_feed = {
            content: req.body["feed_content"],
            image: req["file"] || null,
            uploader_id: you._id
        }
        const new_feed = await post_a_feed(req_feed);
        console.log('new_feed')
        console.log(new_feed)

        const template_path = path.join(process.cwd(), '/src/views/component/feed.ejs');

        return res.send({
            status: 200,
            data: await ejs.renderFile(template_path, {feed: new_feed, owner: you, you: you}, {async: true})
        });
    } catch (e) {
        console.log('errrr')
        console.log(e)
        next(e)
    }
})

router.post('/update', auth, uploader.single('edit_picture'), async function (req, res, next) {
    try {
        const you = req["user_profile"];
        const req_feed = {
            _id: req.body["_id"],
            content: req.body["edit_content"].trim(),
            image: req["file"] || null,
            uploader_id: you._id
        }
        const new_feed = await edit_feed(req_feed);
        const template_path = path.join(process.cwd(), '/src/views/component/feed.ejs')
        return res.send({
            status: 200,
            data: await ejs.renderFile(template_path, {feed: new_feed, owner: you, you: you}, {async: true})
        });
    } catch (e) {
        next(e)
    }
})

router.post('/delete', auth, async function (req, res, next) {
    try {
        const feed_id = req.body["_id_delete"];
        return res.send({
            status: 200,
            data: await delete_feed(feed_id, req["user_profile"]._id)
        });
    } catch (e) {
        next(e)
    }
})

module.exports = router;