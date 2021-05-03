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
                role: acc.role,
                topic: acc.topic,
                google_avatar: acc.google_avatar,
                avatar: acc.avatar
            }
        );
    } catch (e) {
        throw e
    } finally {
        await mongoose.connection.close()
    }
}

module.exports = add_account
