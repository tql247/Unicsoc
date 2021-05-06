const NotificationModel = require("../../models/Notification");
const connect = require("./connection");
const mongoose = require('mongoose');

const count_notification = async function () {
    try {
        await connect();
        return await NotificationModel.find({'deleted_at': null}).countDocuments()
    } catch (e) {
        throw e
    } finally {
        await mongoose.connection.close()
    }
}

module.exports = count_notification

