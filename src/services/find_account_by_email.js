const {AccountModel} = require("../models");
const mongoose = require('mongoose');
const connect = require("../services/connection");

const find_account_by_email = async function (email) {
    try {
        await connect();
        return await AccountModel.
            findOne().
            where('email').
            equals(email).
            exec();
    }catch (e) {
        throw e
    } finally {
        await mongoose.connection.close()
    }
}

module.exports = find_account_by_email
