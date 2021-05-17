const find_account_by_id = require("./accessor/find_account_by_id");

// lấy thông tin của người dùng dựa trên _id nhập vào
async function get_account_data (_id) {
    try {
        const user = await find_account_by_id(_id)
        if (user)
            return user

        const err = new Error();
        err.message = "Email not exist";
        err.name = "Page not found"

        throw err
    } catch (e) {
        throw e
    }
}

module.exports = get_account_data