const Blog = require('../models/blogs');
const Share = require('../models/shares');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.shareBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ status: false, message: 'Blog not found' });
        }

        const share = new Share({ blog: blogId, user: req.user._id });
        await share.save();
        await Blog.findByIdAndUpdate(blogId, { $inc: { shares: 1 } });
        
        res.status(200).json({ status: true, message: 'Blog shared successfully' });
    }
    catch (error) {
        console.error('Error sharing blog:', error);
        res.status(500).json({ status: false, message: 'Server error' });
    }
};