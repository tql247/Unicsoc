const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotificationSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Why no title?']
    },
    detail: {
        type: String,
        required: [true, 'Why no description?']
    },
    topic: {
        type: String,
        required: [true, 'Why no topic?']
    },
    date: {
        type: Date,
        default: Date.now
    },
    uploader : {
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

module.exports = NotificationSchema