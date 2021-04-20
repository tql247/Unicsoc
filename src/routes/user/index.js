const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { connect, find_account_by_email } = require('@utils');

router.get('/', async function (req, res) {
    res.send('login.ejs');
})

router.get('/info/:email', async function (req, res, next) {
    try {
        const { email } = req.params;
        await connect();
        res.send(await find_account_by_email(email));
    } catch (e) {
        next(e)
    } finally {
        await mongoose.connection.close()
    }
})

module.exports = router;