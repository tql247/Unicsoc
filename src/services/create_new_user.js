const add_account = require("./accessor/add_account");

async function create_new_user(new_user) {
    try {
        const new_account = {
            email: new_user.email,
            password: new_user.password,
            full_name: new_user.full_name,
            faculty: new_user.faculty,
            role: "officer",
            topic: new_user.topic,
            avatar: new_user.avatar,
            google_avatar: '/public/images/officer/avatar.png'
        }

        return add_account(new_account)
    } catch (e) {
        throw e
    }
}

module.exports = create_new_user


// const imbase64 = Buffer.from(image.data).toString('base64')
// res.render('index', {image: image})
