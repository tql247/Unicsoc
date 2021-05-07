const express = require('express');
const {auth} = require("../../middlewares/auth");
const create_new_user = require("../../services/create_new_user");
const get_all_officer_info = require("../../services/get_all_officer_info");
const verify_admin = require("../../middlewares/verify_admin");
const list_topic = require("../../utils/dict_declare");
const router = express.Router();

router.get('/', auth, verify_admin, async function (req, res, next) {
    try {
        const officers = await get_all_officer_info()
        return res.render('admin/admin.ejs', {officers, list_topic})
    } catch (e) {
        next(e)
    } finally {
    }
})

// router.post('/create', [auth, moderator_verify], async function (req, res, next) {
router.post('/create', async function (req, res, next) {
    try {
        const new_user = {
            full_name: req.body["full_name"],
            email: req.body["username"],
            password: req.body["password"],
            faculty: req.body["faculty"],
            topic: req.body["topic"],
        }

        res.send({
            status: 200,
            data: await create_new_user(new_user)
        })
    } catch (e) {
        next(e)
    } finally {
    }
})

module.exports = router;