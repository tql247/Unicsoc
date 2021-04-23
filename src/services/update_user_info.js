const {update_account_info} = require("./accessor/update_account");

async function update_user_info(user_req) {
    try {
        const new_user_info = {
            email: user_req.email,
            full_name: user_req.full_name,
            password: user_req.password,
            class_id: user_req.class_id,
            falcuty: user_req.falcuty,
            avatar: user_req.avatar
        }

        await update_account_info(new_user_info)

        return "await update_account_info(new_feed)"
    } catch (e) {
        throw e
    }
}

module.exports = update_user_info
