const find_account_by_email = require("./accessor/find_account_by_email");

async function get_account_data (email) {
    try {
        return await find_account_by_email(email)
    } catch (e) {
        throw e
    }
}

module.exports = get_account_data