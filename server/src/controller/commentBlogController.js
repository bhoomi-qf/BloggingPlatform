const Blog = require('../models/blogs');
const Comment = require('../models/comments');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.addComment = async (req, res) => {
    try {
        const { blogId } = req.params;
        const { comment } = req.body;

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ status: false, message: 'Blog not found' });
        }

        const newComment = new Comment({
            comment,
            blog: blogId,
            user: req.user._id
        });

        await newComment.save();

        res.status(201).json({ status: true, message: 'Comment added successfully', comment: newComment });
    }
    catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ status: false, message: 'Server error' });
    }
};

exports.getComments = async (req, res) => {
    try {
        const { blogId } = req.params;

        const comments = await Comment.find({ blog: blogId }).populate('user', 'username').sort({ createdAt: -1 });

        res.status(200).json({ status: true, message: 'Comments fetched successfully', comments });
    }
    catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ status: false, message: 'Server error' });
    }
};