const soft_delete_feed = require("./accessor/soft_delete_feed");
const find_feed_by_id = require("./accessor/find_feed_by_id");

async function delete_feed(feed_id, user_id) {
    try {
        const feed = await find_feed_by_id(feed_id)
        if (JSON.stringify(feed["uploader_id"]._id) !== JSON.stringify(user_id)) {
            const err = new Error();
            err.name = 'Access Denies'
            err.message = 'You are not have permission'
            return err
        }

        return await soft_delete_feed(feed_id)
    } catch (e) {
        throw e
    }
}

module.exports = delete_feed
