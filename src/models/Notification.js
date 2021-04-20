const mongoose = require("mongoose");
const { NotificationSchema } = require("@schemas");
const NotificationModel = mongoose.model('Notification', NotificationSchema);

module.exports = NotificationModel
