const express = require('express');
const router = express.Router();
const {login_by_google} = require("../../services/login");
const find_account_by_email = require("../../accessor/find_account_by_email");
const google_authenticate = require("../../thirdparty/google");
const auth = require("../../middlewares/auth");
const {update_account_info} = require("../../accessor/update_account_info");
const {login_by_account} = require("../../services/login");


router.get('/', async function (req, res) {
    res.send('user.ejs');
})

router.get('/info/:email', [auth], async function (req, res, next) {
    try {
        const user = await find_account_by_email(req.params["email"])
        res.send(user);
    } catch (e) {
        next(e)
    } finally {
    }
})

router.get('/me', [auth], async function (req, res, next) {
    try {
        // const user = await find_account_by_email(req["user_profile"].email)
        res.send(req["user_profile"]);
    } catch (e) {
        next(e)
    } finally {
    }
})

router.post('/me/update', [auth], async function (req, res, next) {
    try {
        const new_user_info = {
            email: req["user_profile"].email,
            full_name: req.body["full_name"] || req["user_profile"].full_name,
            password: req.body["password"],
            class_id: req.body["class_id"],
            falcuty: req.body["falcuty"],
            avatar: req.body["avatar"]
        }

        res.send(await update_account_info(new_user_info));
    } catch (e) {
        next(e)
    } finally {
    }
})

router.get('/login', async function (req, res, next) {
    try {
        res.send('login.ejs');
    } catch (e) {
    } finally {
    }
})

router.post('/login', async function (req, res, next) {
    try {
        const {email, password} = req.body
        const token = await login_by_account({email: email, password: password})
        res.cookie('jwt', token)
        return res.send(token)
    } catch (e) {
        next(e);
    } finally {
    }
})

router.get(
    '/login/google',
    google_authenticate.authenticate(
        'google',
        {
            scope: ['profile', 'email'],
        },
        console.log
    )
)

router.get(
    '/login/google/callback',
    (req, res, next) => {
        google_authenticate.authenticate(
            'google',
            {
                failureRedirect: '/'
            },
            async ($, info) => {
                try {
                    const {displayName, email} = info
                    const token = await login_by_google({email: email, name: displayName})
                    res.cookie('jwt', token)
                    return res.redirect('back');
                } catch (e) {
                    next(e);
                }
            }
        )(req, res, next);
    }
);

module.exports = router;