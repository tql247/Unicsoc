const find_all_feed = require("./accessor/find_all_feeds");

async function view_feeds(index, email) {
    if (email)
        return await ""
    return await find_all_feed(index)
}

module.exports = view_feeds