const connect = require("./connection");
const mongoose = require('mongoose');
const FeedModel = require("../../models/Feed");

async function delete_feed(feed) {
    try {
        await connect();
        return FeedModel.deleteOne({_id: feed._id});
    } catch (e) {
        throw e
    } finally {
        await mongoose.connection.close()
    }
}

module.exports = delete_feed