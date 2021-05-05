const find_all_notification = require("./accessor/find_all_notification");
const find_all_notification_by_topic = require("./accessor/find_all_notification_by_topic");

async function view_all_notification(index, topic) {
    try {
        if (topic)
            return await find_all_notification_by_topic(index, topic)
        return await find_all_notification(index)
    } catch (e) {
        throw e
    }
}

module.exports = view_all_notification
