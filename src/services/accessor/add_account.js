const connect = require("./connection");
const mongoose = require('mongoose');
const AccountModel = require("../../models/Account");
const {hash_password} = require("../../utils/bcrypt");

async function add_account(acc) {
    try {
        await connect();
        return await AccountModel.create({
                email: acc.email,
                password: await hash_password(acc.password),
                full_name: acc.full_name,
                class_id: acc.class_id,
                faculty: acc.faculty,
                avatar: null,
                google_avatar: acc.google_avatar,
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
