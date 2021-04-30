const find_all_feed = require("./accessor/find_all_feeds");
const find_all_feed_by_account = require("./accessor/find_all_feeds_by_account");

async function view_feeds(index, uploader_id) {
    if (uploader_id)
        return await find_all_feed_by_account(index, uploader_id)
    return await find_all_feed(index)
}

module.exports = view_feeds