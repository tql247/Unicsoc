const connect = require("./connection");
const mongoose = require('mongoose');
const FeedModel = require("../../models/Feed");

async function update_feed(feed) {
    try {
        await connect();
        return await FeedModel.findByIdAndUpdate(
            feed._id,
            {
                content: feed["content"],
                embed_url: feed["embed_url"],
                image: feed["image"],
                updated_at: Date.now()
            },
            {new: true}
        );
    } catch (e) {
        throw e
    } finally {
        await mongoose.connection.close()
    }
}

module.exports = update_feed