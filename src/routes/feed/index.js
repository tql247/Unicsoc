const express = require('express');
const post_a_feed = require("../../services/post_feed");
const uploader = require("../../middlewares/uploader");
const edit_feed = require("../../services/edit_feed");
const view_all_notification = require("../../services/view_notifications");
const soft_delete_feed = require("../../services/accessor/soft_delete_feed");
const router = express.Router();

router.get('/', async function (req, res) {
    res.send('feed');
})

router.post('/all', async function (req, res, next) {
    try {
        let { index } = req.body.index;
        if (!index) index = 1;
        res.send(view_all_notification(index));
    } catch (e) {
        next(e)
    }
})

router.post('/post', uploader.single('picture'),async function (req, res, next) {
    try {
        const req_feed = {
            content: req.body["content"],
            image: req["file"],
            embed_url: req.body["embed_url"],
            uploader_id: req.body["uploader_id"]
        }
        res.send(await post_a_feed(req_feed));
    } catch (e) {
        next(e)
    }
})

router.post('/update', uploader.single('picture'),async function (req, res, next) {
    try {
        const req_feed = {
            _id: req.body["feed_id"],
            content: req.body["content"],
            image: req["file"],
            embed_url: req.body["embed_url"]
        }
        res.send(await edit_feed(req_feed));
    } catch (e) {
        next(e)
    }
})

router.post('/delete', uploader.single('picture'),async function (req, res, next) {
    try {
        const feed_id = req.body["feed_id"];
        res.send(await soft_delete_feed(feed_id));
    } catch (e) {
        next(e)
    }
})

module.exports = router;