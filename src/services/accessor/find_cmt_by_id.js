const connect = require("./connection");
const mongoose = require('mongoose');
const CommentModel = require("../../models/Comment");

async function find_cmt_by_id(_id) {
    try {
        await connect();
        return await CommentModel.findOne({'deleted_at': null, '_id': _id}).exec();
    } catch (e) {
        throw e
    } finally {
        await mongoose.connection.close()
    }
}


module.exports = find_cmt_by_id
