const mongoose = require('mongoose');
const connect = require("./connection");
const AccountModel = require("../../models/Account");

// tìm tất cả account có role là officer
async function find_all_officer () {
    try {
        await connect();
        return await AccountModel.find({'deleted_at': null, 'role': 'officer'}).exec();
    }catch (e) {
        throw e
    } finally {
        await mongoose.connection.close()
    }
}

module.exports = find_all_officer
