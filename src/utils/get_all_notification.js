const { NotificationModel } = require("@models");

const get_all_notification = async function (index) {
    return await NotificationModel.
        find().
        sort({"date": "desc"}).
        skip((index - 1)*10). // 10 is number of notification each page.
        limit(10). // show only 10 notifications each page.
        exec();
}

module.exports = get_all_notification
