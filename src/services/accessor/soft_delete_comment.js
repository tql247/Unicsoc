const connect = require("./connection");
const mongoose = require('mongoose');
const CommentModel = require("../../models/Comment");

// tất cả nội dung của hệ thống không xoá hẳn khỏi database mà chỉnh được đánh dấu là 'đã xoá'
// xoá bình luận
async function soft_delete_cmt(cmt_id) {
    try {
        await connect();
        console.log('cmt_id')
        console.log(cmt_id)
        return await CommentModel.findByIdAndUpdate(
            cmt_id,
            {
                deleted_at: Date.now()
            }
        );
    } catch (e) {
        throw e
    } finally {
        await mongoose.connection.close()
    }
}

module.exports = soft_delete_cmt