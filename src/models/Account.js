const mongoose = require("mongoose");
const AccountSchema = require("./schemas/Account");
const AccountModel = mongoose.model('Account', AccountSchema);

module.exports = AccountModel
