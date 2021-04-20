const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {connect, get_all_notification, add_new_notification} = require('@utils');

router.get('/', async function (req, res) {
    res.send('notification');
})

router.get('/all/:index', async function (req, res, next) {
    try {
        const { index } = req.params;
        await connect();
        res.send(await get_all_notification(index));
    } catch (e) {
        next(e)
    } finally {
        await mongoose.connection.close()
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
        await connect();
        const notification = {
            "title": title,
            "detail": detail,
            "topic": topic,
            "uploader": uploader_id
        }
        res.send(await add_new_notification(notification));
    } catch (e) {
        next(e)
    } finally {
        await mongoose.connection.close()
    }
})

module.exports = router;