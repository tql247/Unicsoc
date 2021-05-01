const mongoose = require("mongoose");
const CommentSchema = require("./schemas/Comment");
const CommentModel = mongoose.model('Comment', CommentSchema, 'comment');

module.exports = CommentModel
