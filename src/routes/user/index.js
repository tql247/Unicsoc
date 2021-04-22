const express = require('express');
const router = express.Router();
const {login_by_google} = require("../../services/login");
const find_account_by_email = require("../../services/find_account_by_email");
const google_authenticate = require("../../thirdparty/google");
const auth = require("../../middlewares/auth");
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
                    return res.redirect('/')
                } catch (e) {
                    next(e);
                }
            }
        )(req, res, next);
    }
);

module.exports = router;