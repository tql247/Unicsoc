const express = require('express');
const router = express.Router();
const { add_new_account, connect } = require('@utils');


router.get('/', async function (req, res, next) {
    try {
        await connect()
        const account = {
            email: "lammm",
            password: "account.password",
            full_name: "account.full_name",
            role: "student"
        }

        const r = await add_new_account(account)

        res.send(r)
    } catch (e) {
        next(e)
    } finally {
    }
})

module.exports = router;