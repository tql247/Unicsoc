const find_account_by_email = require("./accessor/find_account_by_email");

async function get_account_data (email) {
    try {
        const user = await find_account_by_email(email)
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