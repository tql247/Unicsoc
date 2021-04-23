const mongoose = require("mongoose");
const NotificationSchema = require("./schemas/Notification");
const NotificationModel = mongoose.model('Notification', NotificationSchema);

module.exports = NotificationModel
