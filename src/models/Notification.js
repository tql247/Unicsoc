const mongoose = require("mongoose");
const { NotificationSchema } = require("@schemas");
const NotificationModel = mongoose.model('Account', NotificationSchema);

module.exports = NotificationModel
