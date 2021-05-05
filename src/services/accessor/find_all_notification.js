const NotificationModel = require("../../models/Notification");
const connect = require("./connection");
const mongoose = require('mongoose');

const find_all_notification = async function (index) {
    try {
        await connect();
        return await NotificationModel.find({'deleted_at': null}).
            sort({"created_at": "desc"}).
            skip((index - 1) * 10). // 10 is number of notification each page.
            limit(10). // show only 10 notifications each page.
            populate('uploader', "full_name email").
            exec();
    } catch (e) {
        throw e
    } finally {
        await mongoose.connection.close()
    }
}

module.exports = find_all_notification

