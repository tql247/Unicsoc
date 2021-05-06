const update_notification = require("./accessor/update_notification");
const find_notification_by_id = require("./accessor/find_notification_by_id");

async function edit_notification (req_notification, uploader) {
    try {
        const notification = await find_notification_by_id(req_notification.edit_notification_id)
        if (JSON.stringify(notification["uploader"]._id) !== JSON.stringify(uploader))
            return notification

        const new_notification = {
            _id: req_notification.edit_notification_id,
            title: req_notification.edit_notification_title,
            detail: req_notification.edit_notification_content,
            topic: req_notification.edit_notify_topic,
        }

        console.log(new_notification)

        return await update_notification(new_notification)

    } catch (e) {
        throw e
    }
}

module.exports = edit_notification