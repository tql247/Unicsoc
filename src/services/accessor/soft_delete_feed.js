const connect = require("./connection");
const mongoose = require('mongoose');
const FeedModel = require("../../models/Feed");

async function soft_delete_feed(feed_id) {
    try {
        await connect();
        return await FeedModel.findByIdAndUpdate(
            feed_id,
            {
                deleted_at: Date.now()
            }
        );
    } catch (e) {
        throw e
    } finally {
        await mongoose.connection.close()
    }
}

module.exports = soft_delete_feed