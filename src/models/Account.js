const mongoose = require("mongoose");
const { AccountSchema } = require("@schemas");
const AccountModel = mongoose.model('Account', AccountSchema);

module.exports = AccountModel
