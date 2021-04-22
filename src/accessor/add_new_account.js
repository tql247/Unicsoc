const { hash_password } = require("@utils");
const { AccountModel } = require("@models");
const mongoose = require('mongoose');
const connect = require("./connection");

const add_new_account = async function (account) {
    try {
        await connect();
        return await AccountModel.create(
            {
                email: account.email,
                password: await hash_password(account.password),
                full_name: account.full_name,
                role: account.role
            })
    } catch (e) {
        throw e
    } finally {
        await mongoose.connection.close()
    };
}

module.exports = add_new_account
