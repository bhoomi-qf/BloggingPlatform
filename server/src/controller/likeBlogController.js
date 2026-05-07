const Blog = require('../models/blogs');
const Like = require('../models/likes');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.likeDislikeBlog = async (req, res) => {
    try {
        const { blogId } = req.params;

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ status: false, message: 'Blog not found' });
        }

        const existingLike = await Like.findOne({ blog: blogId, user: req.user._id });
        if (existingLike) {
            await existingLike.remove();
            await Blog.findByIdAndUpdate(blogId, { $inc: { likes: -1 } });

            return res.status(200).json({ status: true, message: 'Blog unliked successfully' });
        }

        const like = new Like({ blog: blogId, user: req.user._id });
        await like.save();
        await Blog.findByIdAndUpdate(blogId, { $inc: { likes: 1 } });

        res.status(200).json({ status: true, message: 'Blog liked successfully' });
    }
    catch (error) {
        console.error('Error liking blog:', error);
        res.status(500).json({ status: false, message: 'Server error' });
    }
};