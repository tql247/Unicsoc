const mongoose = require("mongoose");
const NotificationSchema = require("./schemas/Notification");
const NotificationModel = mongoose.model('notification', NotificationSchema, 'notification');

module.exports = NotificationModel
