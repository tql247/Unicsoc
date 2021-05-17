const connect = require("./connection");
const mongoose = require('mongoose');
const NotificationModel = require("../../models/Notification");

// tất cả nội dung của hệ thống không xoá hẳn khỏi database mà chỉnh được đánh dấu là 'đã xoá'
// xoá thông báo
async function soft_delete_notification(notification_id) {
    try {
        await connect();
        return await NotificationModel.findByIdAndUpdate(
            notification_id,
            {
                deleted_at: Date.now()
            },
            {new: true}
        );
    } catch (e) {
        throw e
    } finally {
        await mongoose.connection.close()
    }
}

module.exports = soft_delete_notification