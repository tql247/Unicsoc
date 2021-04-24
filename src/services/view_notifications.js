const find_all_notification = require("./accessor/find_all_notification");

async function view_all_notification(index) {
    try {
        return await find_all_notification(index)
    } catch (e) {
        throw e
    }
}

module.exports = view_all_notification