const mongoose = require("mongoose");
const CommentSchema = require("./schemas/Comment");
const CommentModel = mongoose.model('Feed', CommentSchema);

module.exports = CommentModel
