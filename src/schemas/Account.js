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
    role: {
        type: String,
        enum: ['admin', 'student', 'groups'],
        required: [true, 'Why no role?']
    }
});

module.exports = AccountSchema