const mongoose = require("mongoose");
const FeedSchema = require("./schemas/Feed");
const FeedModel = mongoose.model('Feed', FeedSchema, 'feed');

module.exports = FeedModel
