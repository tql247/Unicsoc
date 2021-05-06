const FeedModel = require("../../models/Feed");
const connect = require("./connection");
const mongoose = require('mongoose');

async function add_feed (feed) {
    try {
        await connect();
        const new_feed = await FeedModel.create(
            {
                content: feed["content"],
                image: feed["image"],
                embed_url: feed["embed_url"],
                uploader_id: feed["uploader_id"]
            }
        );

        return await new_feed.populate('uploader_id').execPopulate()
    } catch (e) {
        throw e
    } finally {
        await mongoose.connection.close()
    }
}

module.exports = add_feed
