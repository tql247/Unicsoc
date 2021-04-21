const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const login = require("../../services/login");
const find_account_by_email = require("../../services/find_account_by_email");
const google_authenticate = require("../../thirdparty/google");
const auth = require("../../middlewares/auth");


router.get('/', async function (req, res) {
    res.send('user.ejs');
})

router.get('/info/:email', [auth], async function (req, res, next) {
    try {
        const {email} = req.params;
        res.send(JSON.stringify(req.headers));
    } catch (e) {
        next(e)
    } finally {
        // await mongoose.connection.close()
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
        res.send('login.ejs');
    } catch (e) {
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
                    await login({email: email, name: displayName})
                    // return res.render('index')
                    return res.redirect('/')
                } catch (e) {
                    next(e);
                }
            }
        )(req, res, next);
    }
);

module.exports = router;