const make_image_obj = require("../utils/make_image_obj");
const update_account = require("./accessor/update_account");
const {sign_token_to_user} = require("./login");

async function update_user_info(user_req) {
    try {
        const new_user_info = {
            email: user_req.email,
            full_name: user_req.full_name,
            password: user_req.password,
            class_id: user_req.class_id,
            faculty: user_req.faculty,
            avatar: await make_image_obj(user_req.avatar)
        }


        const user = await update_account(new_user_info)
        return await sign_token_to_user(user)
    } catch (e) {
        throw e
    }
}

module.exports = update_user_info
