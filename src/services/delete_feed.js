const soft_delete = require("./accessor/soft_delete_feed");

async function delete_feed(feed_id) {
    try {
        return await soft_delete(feed_id)
    } catch (e) {
        throw e
    }
}

module.exports = delete_feed
