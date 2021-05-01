const FeedModel = require("../../models/Feed");
const connect = require("./connection");
const mongoose = require('mongoose');

async function find_all_feed_by_account(index, uploader_id) {
    try {
        await connect();
        return await FeedModel.find({'deleted_at': null, 'uploader_id': uploader_id}).skip((index - 1) * 10).limit(10).sort({'created_at': 'desc'}).populate('uploader_id').exec();
    } catch (e) {
        throw e
    } finally {
        await mongoose.connection.close()
    }
}


module.exports = find_all_feed_by_account
