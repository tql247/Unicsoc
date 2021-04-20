const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotificationSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Why no title?']
    },
    content: {
        type: String,
        required: [true, 'Why no content?']
    },
    description: {
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
})

module.exports = NotificationSchema