const express = require('express');
const router = express.Router();

router.get('/', async function (req, res) {
    res.send('notification');
})

router.get('/all/:index', async function (req, res, next) {
    try {
        const { index } = req.params;
        res.send("await get_all_notification(index)");
    } catch (e) {
        next(e)
    }
})

router.post('/post', async function (req, res, next) {
    try {
        const {
            title,
            detail,
            topic,
            uploader_id
        } = req.body;
        const notification = {
            "title": title,
            "detail": detail,
            "topic": topic,
            "uploader": uploader_id
        }
        res.send( "add_new_notification(notification)");
    } catch (e) {
        next(e)
    }
})

module.exports = router;