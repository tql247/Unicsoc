const mongoose = require("mongoose");
const CommentSchema = require("./schemas/Comment");
const CommentModel = mongoose.model('comment', CommentSchema, 'comment');

module.exports = CommentModel
