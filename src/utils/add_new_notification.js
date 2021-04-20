const { NotificationModel } = require("@models");

const add_new_notification = async function (notification) {
    return await NotificationModel.create(
        {
            title: notification.title,
            content: notification.content,
            description: notification.description,
            topic: notification.topic,
            uploader : notification.uploader
        }
    );
}

module.exports = add_new_notification
