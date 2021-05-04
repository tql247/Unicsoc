const add_notification = require("./accessor/add_notification");

async function post_notification(req_notification, uploader) {
    try {
        const new_notification = {
            notification_title: req_notification.notification_title.trim(),
            notification_content: req_notification.notification_content.trim(),
            notify_topic: req_notification.notify_topic,
            uploader: uploader
        }

        return await add_notification(new_notification)
    } catch (e) {
        throw e
    }
}

module.exports = post_notification
