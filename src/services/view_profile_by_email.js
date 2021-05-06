const find_account_by_email = require("./accessor/find_account_by_email");

async function view_profile_by_email(email) {
    try {
        return await find_account_by_email(email)
    } catch (e) {
        throw e
    }
}

module.exports = view_profile_by_email