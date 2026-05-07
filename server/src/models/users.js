const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true, // Add index for faster queries
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'author', 'reader'],
        default: 'reader',
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);