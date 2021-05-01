const express = require('express');
const auth = require("../../middlewares/auth");
const moderator_verify = require("../../middlewares/verify_admin");
const create_new_user = require("../../services/create_new_user");
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
            faculty: req.body["faculty"],
            avatar: req.body["avatar"],
            role: req.body["role"]
        }

        res.send(await create_new_user(new_user))
    } catch (e) {
        next(e)
    } finally {
    }
})

module.exports = router;