const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    content: {
        type: String,
        required: [true, 'Content empty?']
    },
    feed: {
        type: Schema.Types.ObjectId,
        ref: 'Feed',
        localField: 'feed',
        foreignField: '_id',
        justOne: true
    },
    commenter: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        localField: 'commenter',
        foreignField: '_id',
        justOne: true
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