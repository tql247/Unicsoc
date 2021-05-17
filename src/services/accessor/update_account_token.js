const connect = require("./connection");
const mongoose = require('mongoose');
const AccountModel = require("../../models/Account");

// cập nhật token cho tài khoản, nhằm để lưu trữ và
// xác thực token của người dùng có đáng tin hay không
async function update_account_token(email, jwt) {
    try {
        await connect();

        return await AccountModel.findOneAndUpdate({email: email}, {
            token: jwt
        });
    } catch (e) {
        throw e
    } finally {
        await mongoose.connection.close()
    }
}

module.exports = update_account_token