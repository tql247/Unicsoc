const express = require('express');
const router = express.Router();
const comment_a_feed = require("../../services/comment_feed");
const delete_comment = require("../../services/delete_comment");
const ejs = require('ejs');
const path = require("path");
const {auth_quick} = require("../../middlewares/auth");

router.post('/post', auth_quick, async function (req, res, next) {
    try {
        const comment = {
            feed: req.body["comment_feed_id"],
            content: req.body["comment_content"],
            commenter: req["client_id"]
        }
        const new_comment = await comment_a_feed(comment);
        const comment_template = path.join(process.cwd(), '/src/views/component/comment.ejs');

        return res.send({
            status: 200,
            data: await ejs.renderFile(comment_template, {comment: new_comment}, {async: true})
        });
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