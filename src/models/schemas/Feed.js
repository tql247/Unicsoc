const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FeedSchema = new Schema({
    content: {
        type: String,
        required: [true, 'Content empty?']
    },
    image: {
        contentType: String,
        data: Buffer
    },
    embed_url: {
        type: String
    },
    uploader_id: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        localField: 'uploader_id',
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

module.exports = FeedSchema