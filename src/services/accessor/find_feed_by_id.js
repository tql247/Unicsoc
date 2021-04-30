const FeedModel = require("../../models/Feed");
const connect = require("./connection");
const mongoose = require('mongoose');

async function find_feed_by_id(_id) {
    try {
        await connect();
        return await FeedModel.findOne({'deleted_at': undefined, '_id': _id}).populate('uploader_id').exec();
    } catch (e) {
        throw e
    } finally {
        await mongoose.connection.close()
    }
}


module.exports = find_feed_by_id
