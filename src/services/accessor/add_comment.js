const connect = require("./connection");
const mongoose = require('mongoose');
const CommentModel = require("../../models/Comment");

async function add_comment(comment) {
    try {
        await connect();
        return await CommentModel.create(
            {
                content: comment["content"],
                feed: comment["feed"],
                commenter: comment["commenter"]
            }
        );
    } catch (e) {
        throw e
    } finally {
        await mongoose.connection.close()
    }
}

module.exports = add_comment
