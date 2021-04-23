const connect = require("./connection");
const mongoose = require('mongoose');
const AccountModel = require("../../models/Account");
const {hash_password} = require("../../utils");

async function update_account(user) {
    try {
        await connect();
        if (user.password) {
            await AccountModel.findOneAndUpdate({email: user.email}, {
                password: await hash_password(user.password)
            });
        }

        if (user.avatar) {
            await AccountModel.findOneAndUpdate({email: user.email}, {
                avatar: user.avatar
            });
        }

        return await AccountModel.findOneAndUpdate({email: user.email}, {
            full_name: user.full_name,
            class_id: user.class_id,
            falcuty: user.falcuty,
        });
    } catch (e) {
        throw e
    } finally {
        await mongoose.connection.close()
    }
}

module.exports = update_account