const express = require('express');
const router = express.Router();
const comment_a_feed = require("../../services/comment_feed");
const delete_comment = require("../../services/delete_comment");

router.post('/post',async function (req, res, next) {
    try {
        const comment = {
            content: req.body["content"],
            feed_id: req.body["feed_id"],
            uploader_id: req.body["uploader_id"]
        }
        res.send(await comment_a_feed(comment));
    } catch (e) {
        next(e)
    }
})

router.post('/delete',async function (req, res, next) {
    try {
        const comment_id = req.body["comment_id"];
        res.send(await delete_comment(comment_id));
    } catch (e) {
        next(e)
    }
})

module.exports = router;