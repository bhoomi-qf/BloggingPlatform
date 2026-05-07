const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    sort_content: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tags: [String],
    likes: {
        type: Number,
        default: 0,
    },
    shares: {
        type: Number,
        default: 0,
    },
    facebook_link: {
        type: String,
    },
    instagram_link: {
        type: String,
    },
    twitter_link: {
        type: String,
    },
    linkedin_link: {
        type: String,
    },
    conclusion: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);