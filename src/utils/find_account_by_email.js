const {AccountModel} = require("@models");

const find_account_by_email = async function (email) {
    return await AccountModel.
        findOne().
        where('email').
        equals(email).
        exec();
}

module.exports = find_account_by_email
