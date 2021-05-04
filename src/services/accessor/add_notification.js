const connect = require("./connection");
const mongoose = require('mongoose');
const NotificationModel = require("../../models/Notification");

async function add_notification (notification) {
    try {
        await connect();
        return await NotificationModel.create(
            {
                title: notification.notification_title,
                detail: notification.notification_content,
                topic: notification.notify_topic,
                uploader: notification.uploader
            }
        );
    } catch (e) {
        throw e
    } finally {
        await mongoose.connection.close()
    }
}

module.exports = add_notification
