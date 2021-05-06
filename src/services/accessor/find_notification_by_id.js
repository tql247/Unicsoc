const connect = require("./connection");
const mongoose = require('mongoose');
const NotificationModel = require("../../models/Notification");

async function find_notification_by_id(_id) {
    try {
        await connect();
        return await NotificationModel.findOne({'deleted_at': undefined, '_id': _id}).populate('uploader', "email full_name").exec();
    } catch (e) {
        throw e
    } finally {
        await mongoose.connection.close()
    }
}


module.exports = find_notification_by_id
