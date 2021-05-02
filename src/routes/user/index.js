const express = require('express');
const router = express.Router();
const {login_by_google} = require("../../services/login");
const google_authenticate = require("../../services/thirdparty/google");
const {auth} = require("../../middlewares/auth");
const update_user_info = require("../../services/update_user_info");
const uploader = require("../../middlewares/uploader");
const view_feeds = require("../../services/view_feeds");
const get_account_data = require("../../services/get_account_data");
const {login_by_account} = require("../../services/login");


router.get('/', async function (req, res) {
    res.send('user.ejs');
})

router.get('/visit/:email', auth, async function (req, res, next) {
    try {
        const user = await get_account_data(req.params["email"])
        const feed_list = await view_feeds(1, user["_id"])
        return res.render('user/profile', {user, feed_list})
    } catch (e) {
        next(e)
    }
})

// router.get('/me',  async function (req, res, next) {
router.get('/me', auth, async function (req, res, next) {
    try {
        const user = req["user_profile"]
        const feed_list = await view_feeds(1, user._id)
        return res.render('user/profile', {user, feed_list})
    } catch (e) {
        next(e)
    }
})

router.post('/me/update', auth, uploader.single('new_avatar'), async function (req, res, next) {
    try {
        console.log(req.body)
        const user_req = {
            email: req["user_profile"].email,
            full_name: req.body["full_name"] || req["user_profile"].full_name,
            password: req.body["password"],
            class_id: req.body["class_id"],
            faculty: req.body["faculty"],
            // avatar: req.body["avatar"]
        }

        await update_user_info(user_req)
        return res.redirect('back');
    } catch (e) {
        next(e)
    }
})

router.get('/login', async function (req, res, next) {
    try {
        res.render('login/index');
    } catch (e) {
    } finally {
    }
})

router.get(
    '/logout',
    async function (req, res, next) {
        try {
            res.clearCookie('jwt');
            next();
        } catch (e) {
            next(e);
        }
    },
    (req, res) => {
        return res.redirect('/')
    }
)

router.post('/login', async function (req, res, next) {
    try {
        const {email, password} = req.body
        const token = await login_by_account({email: email, password: password})
        res.cookie('jwt', token)
        return res.send(token)
    } catch (e) {
        next(e);
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
                    const {displayName, email, picture} = info
                    const token = await login_by_google({email: email, name: displayName, google_avatar: picture})
                    res.cookie('jwt', token)
                    next();
                } catch (e) {
                    next(e);
                }
            }
        )(req, res, next);
    },
    (req, res, next) => {
        return res.redirect('/');
        // return res.redirect('back');
    }
);

module.exports = router;