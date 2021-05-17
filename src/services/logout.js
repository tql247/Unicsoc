const update_account_token = require("./accessor/update_account_token");

// Dùng để đăng xuất
async function logout(email) {
    try {
        return await update_account_token(email, '');
    } catch (e) {
        throw e
    }
}

module.exports = logout