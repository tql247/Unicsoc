const NotificationModel = require("../../models/Notification");
const find_all_notification = async function (index) {
    return await NotificationModel.
        find().
        where('deleted_at').
        equals(null).
        sort({"date": "desc"}).
        skip((index - 1)*10). // 10 is number of notification each page.
        limit(10). // show only 10 notifications each page.
        exec();
}

module.exports = find_all_notification
