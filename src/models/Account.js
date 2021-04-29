const mongoose = require("mongoose");
const AccountSchema = require("./schemas/Account");
const AccountModel = mongoose.model('account', AccountSchema, 'account');

module.exports = AccountModel
