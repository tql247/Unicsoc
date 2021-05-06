const soft_delete_notification = require("./accessor/soft_delete_notification");
const find_notification_by_id = require("./accessor/find_notification_by_id");

async function delete_notification(notification_id, user_id) {
    try {
        const notification = await find_notification_by_id(notification_id)
        if (JSON.stringify(notification["uploader"]._id) !== JSON.stringify(user_id)) {
            const err = new Error();
            err.name = 'Access Denies'
            err.message = 'You are not have permission'
            return err
        }

        return await soft_delete_notification(notification_id)
    } catch (e) {
        throw e
    }
}

module.exports = delete_notification
