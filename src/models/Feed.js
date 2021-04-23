const mongoose = require("mongoose");
const FeedSchema = require("./schemas/Feed");
const FeedModel = mongoose.model('Feed', FeedSchema);

module.exports = FeedModel
