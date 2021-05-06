const NotificationModel = require("../../models/Notification");
const connect = require("./connection");
const mongoose = require('mongoose');

const count_notification_by_topic = async function (topic) {
    try {
        await connect();
        return await NotificationModel.find({'deleted_at': null, 'topic': topic}).countDocuments()
    } catch (e) {
        throw e
    } finally {
        await mongoose.connection.close()
    }
}

module.exports = count_notification_by_topic

