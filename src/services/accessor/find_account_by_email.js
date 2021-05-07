const mongoose = require('mongoose');
const connect = require("./connection");
const AccountModel = require("../../models/Account");

async function find_account_by_email (email) {
    try {
        await connect();
        return await AccountModel.
            findOne({'email': email}, "-token").
            exec();
    }catch (e) {
        throw e
    } finally {
        await mongoose.connection.close()
    }
}

module.exports = find_account_by_email
