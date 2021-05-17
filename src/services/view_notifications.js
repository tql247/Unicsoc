const find_all_notification = require("./accessor/find_all_notification");
const find_all_notification_by_topic = require("./accessor/find_all_notification_by_topic");

// trả về danh sách thông báo với index và topic cho trước
async function view_all_notification(index, topic) {
    try {
        if (topic)
            // khi có yêu cầu topic cụ thể thì trả về thông báo theo topic
            return await find_all_notification_by_topic(index, topic)
        // khi không có yêu cầu cụ thể thì trả về thông báo mà không lọc topic
        return await find_all_notification(index)
    } catch (e) {
        throw e
    }
}

module.exports = view_all_notification
