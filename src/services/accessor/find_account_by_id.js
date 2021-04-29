const mongoose = require('mongoose');
const connect = require("./connection");
const AccountModel = require("../../models/Account");

async function find_account_by_id (id) {
    try {
        await connect();
        return await AccountModel.findById(id);
    }catch (e) {
        throw e
    } finally {
        await mongoose.connection.close()
    }
}

module.exports = find_account_by_id
