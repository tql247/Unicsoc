const express = require('express');
const add_new_account = require("../../accessor/add_new_account");
const auth = require("../../middlewares/auth");
const moderator_verify = require("../../middlewares/moderator_verify");
const router = express.Router();

router.get('/', async function (req, res, next) {
    try {
        res.send('God here!')
    } catch (e) {
        next(e)
    } finally {
    }
})

router.post('/create', [auth, moderator_verify], async function (req, res, next) {
    try {
        const new_user = {
            email: req.body["email"],
            full_name: req.body["full_name"],
            password: req.body["password"],
            class_id: req.body["class_id"],
            falcuty: req.body["falcuty"],
            avatar: req.body["avatar"],
            role: req.body["role"]
        }

        res.send(await add_new_account(new_user))
    } catch (e) {
        next(e)
    } finally {
    }
})

module.exports = router;