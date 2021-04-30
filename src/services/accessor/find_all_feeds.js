const FeedModel = require("../../models/Feed");
const connect = require("./connection");
const mongoose = require('mongoose');

async function find_all_feed(index) {
    try {
        await connect();
        return await FeedModel.find({}).skip((index - 1) * 10).limit(10).sort({'created_at': 'desc'})
            .populate('uploader_id').exec();
    } catch (e) {
        throw e
    } finally {
        await mongoose.connection.close()
    }
}


module.exports = find_all_feed
