const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Why no username?'],
        unique: [true, 'This email is exist']
    },
    password: {
        type: String,
        required: [true, 'Why no password?']
    },
    full_name: {
        type: String,
        required: [true, 'Why no name?']
    },
    class_id: {
        type: String
    },
    faculty: {
        type: String
    },
    avatar: {
        data: Buffer,
        contentType: String
    },
    google_avatar: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'student', 'officer'],
        required: [true, 'Why no role?']
    },
    topic: {
        type: Array,
        default: []
    },
    token: {
        type: String,
    }
});

module.exports = AccountSchema