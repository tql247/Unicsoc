const find_notification_by_id = require("./accessor/find_notification_by_id");

async function view_notification_detail(id) {
    try {
        return await find_notification_by_id(id)
    } catch (e) {
        throw e
    }
}

module.exports = view_notification_detail
