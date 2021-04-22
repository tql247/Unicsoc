const { NotificationModel } = require("@models");

const add_new_notification = async function (notification) {
    return await NotificationModel.create(
        {
            title: notification.title,
            detail: notification.detail,
            topic: notification.topic,
            uploader : notification.uploader
        }
    );
}

module.exports = add_new_notification
