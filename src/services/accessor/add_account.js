const connect = require("./connection");
const mongoose = require('mongoose');
const AccountModel = require("../../models/Account");
const {hash_password} = require("../../utils");

async function add_account(acc) {
    try {
        await connect();
        return await AccountModel.create({
                email: acc.email,
                password: await hash_password(acc.password),
                full_name: acc.full_name,
                class_id: acc.class_id,
                falcuty: acc.falcuty,
                avatar: null,
                role: acc.role,
            }
        );
    } catch (e) {
        throw e
    } finally {
        await mongoose.connection.close()
    }
}

module.exports = add_account
