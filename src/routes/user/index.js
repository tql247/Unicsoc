const express = require('express');
const router = express.Router();
const {login_by_google} = require("../../services/login");
const google_authenticate = require("../../services/thirdparty/google");
const auth = require("../../middlewares/auth");
const update_user_info = require("../../services/update_user_info");
const view_all_user_feeds = require("../../services/view_feeds");
const uploader = require("../../middlewares/uploader");
const {login_by_account} = require("../../services/login");


router.get('/', async function (req, res) {
    res.send('user.ejs');
})

router.get('/visit/:email', [auth], async function (req, res, next) {
    try {
        const user = await view_all_user_feeds(req.params["email"])
        res.send(user);
    } catch (e) {
        next(e)
    } finally {
    }
})

router.get('/me',  async function (req, res, next) {
// router.get('/me', [auth], async function (req, res, next) {
    try {
        // const user = await find_account_by_email(req["user_profile"].email)
        req["user_profile"] = {
            email: 'toitenlalinh9xpro@gmail.com',
            password: '$2a$10$HKTfMlPfcSW08y0J21BzaeRNRRJKYcfq01F2AqkNPbb94VN7mjj.m',
            full_name: 'Lian',
            google_avatar: 'https://lh3.googleusercontent.com/a-/AOh14GgRu9Fj3nBP-CZo6qr8D_DoW6RTrks4gwTxXnq0Fw=s96-c',
            role: 'student'
        }
        const full_name = req["user_profile"]["full_name"]
        const email = req["user_profile"]["email"]
        const avatar = req["user_profile"]["avatar"]
        const google_avatar = req["user_profile"]["google_avatar"]
        const falcuty = req["user_profile"]["falcuty"] || ""
        const class_id = req["user_profile"]["class_id"] || ""
        return res.render('user/profile', {email, full_name, avatar, google_avatar, falcuty, class_id})
    } catch (e) {
        next(e)
    } finally {
    }
})

router.post('/me/update', [auth, uploader.single('new_avatar')], async function (req, res, next) {
    try {
        console.log(req.body)
        const user_req = {
            email: req["user_profile"].email,
            full_name: req.body["full_name"] || req["user_profile"].full_name,
            password: req.body["password"],
            class_id: req.body["class_id"],
            falcuty: req.body["falcuty"],
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