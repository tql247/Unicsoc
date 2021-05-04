const connect = require("./connection");
const mongoose = require('mongoose');
const NotificationModel = require("../../models/Notification");

async function update_notification(notification) {
    try {
        await connect();
        return await NotificationModel.findByIdAndUpdate(
            notification._id,
            {
                title: notification.title,
                detail: notification.detail,
                topic: notification.topic,
                updated_at: Date.now()
            },
            {new: true}
        );
    } catch (e) {
        throw e
    } finally {
        await mongoose.connection.close()
    }
}

module.exports = update_notification