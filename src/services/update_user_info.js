const make_image_obj = require("../utils/make_image_obj");
const update_account = require("./accessor/update_account");

async function update_user_info(user_req) {
    try {
        const new_user_info = {
            email: user_req.email,
            full_name: user_req.full_name,
            password: user_req.password,
            class_id: user_req.class_id,
            faculty: user_req.faculty,
            avatar: make_image_obj(user_req.avatar)
        }

        return await update_account(new_user_info)
    } catch (e) {
        throw e
    }
}

module.exports = update_user_info
