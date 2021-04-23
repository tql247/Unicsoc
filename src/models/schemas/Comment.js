const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    content: {
        type: String,
        required: [true, 'Content empty?']
    },
    feed_id: {
        type: Schema.Types.ObjectId,
        ref: 'Feed'
    },
    uploader_id: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date
    },
    deleted_at: {
        type: Date
    },
})

module.exports = CommentSchema