const mongoose = require("mongoose");
const FeedSchema = require("./schemas/Feed");
const FeedModel = mongoose.model('feed', FeedSchema, 'feed');

module.exports = FeedModel
