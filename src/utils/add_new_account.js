const {hashPassword} = require("./bcrypt");
const { AccountModel } = require("@models");

const add_new_account = async function (account) {
    return await AccountModel.create(
        {
            email: account.email,
            password: hashPassword(account.password),
            full_name: account.full_name,
            role: account.role
        }
    );
}

module.exports = add_new_account
