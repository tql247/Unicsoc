const mongoose = require("mongoose");
const AccountSchema = require("./schemas/Account");
const AccountModel = mongoose.model('Account', AccountSchema, 'account');

module.exports = AccountModel
