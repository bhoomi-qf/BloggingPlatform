const Blog = require('../models/blogs');
const Comment = require('../models/comments');
const Like = require('../models/likes');
const Share = require('../models/shares');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.createBlog = async (req, res) => {
    try {
        const { title, sort_content, content, tags, facebook_link, instagram_link, twitter_link, linkedin_link, conclusion } = req.body;

        let existingBlog = await Blog.findOne({ title });
        if (existingBlog) {
            return res.status(400).json({ status: false, message: 'Blog with this title already exists' });
        }

        const blog = new Blog({ title, content, author: req.user._id, tags, sort_content, facebook_link, instagram_link, twitter_link, linkedin_link, conclusion });

        await blog.save();
        
        res.status(201).json({ status: true, message: 'Blog created successfully', blog });
    }
    catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({ status: false, message: 'Server error' });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, sort_content, content, tags, facebook_link, instagram_link, twitter_link, linkedin_link, conclusion } = req.body;

        let blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ status: false, message: 'Blog not found' });
        }

        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ status: false, message: 'You are not authorized to update this blog' });
        }

        blog.title = title || blog.title;
        blog.sort_content = sort_content || blog.sort_content;
        blog.content = content || blog.content;
        blog.tags = tags || blog.tags;
        blog.facebook_link = facebook_link || null;
        blog.instagram_link = instagram_link || null;
        blog.twitter_link = twitter_link || null;
        blog.linkedin_link = linkedin_link || null;
        blog.conclusion = conclusion || blog.conclusion;

        await blog.save();
        
        res.status(200).json({ status: true, message: 'Blog updated successfully', blog });
    }
    catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ status: false, message: 'Server error' });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        let blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ status: false, message: 'Blog not found' });
        }

        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ status: false, message: 'You are not authorized to delete this blog' });
        }

        await Blog.findByIdAndDelete(id);
        await Comment.deleteMany({ blog: id });
        await Like.deleteMany({ blog: id });
        await Share.deleteMany({ blog: id });

        res.status(200).json({ status: true, message: 'Blog deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ status: false, message: 'Server error' });
    }
}

exports.getBlogs = async (req, res) => {
    try {
        const { search, is_author } = req.body;

        let whereClause = {};
        if (search) {
            whereClause = {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { sort_content: { $regex: search, $options: 'i' } },
                    { content: { $regex: search, $options: 'i' } }
                ]
            };
        }
        if (is_author) {
            whereClause.author = new ObjectId(req.user._id);
        }

        const blogCount = await Blog.countDocuments({ ...whereClause });

        const pageNo = req.body.pageNo || 1;
        const pageSize = req.body.pageSize || 10;
        const sortBy = req.body.sortBy || 'created_at';
        const skip = (pageNo - 1) * pageSize;
        const totalRecords = blogCount;
        const totalPages = Math.ceil(totalRecords / pageSize);

        const blogs = await Blog.aggregate([
            {
                $match: {
                    ...whereClause
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'author',
                    foreignField: '_id',
                    as: 'author_info'
                }
            },
            {
                $unwind: '$author_info'
            },
            {
                $project: {
                    title: 1,
                    sort_content: 1,
                    created_at: 1
                }
            },
            {
                $skip: skip
            },
            {
                $limit: pageSize
            }
        ]);

        res.status(200).json({ status: true, message: 'Blogs fetched successfully', data: { blogs, totalRecords, totalPages } });
    }
    catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ status: false, message: 'Server error' });
    }
};

exports.getBlogById = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findById(id).populate('author', 'name email');
        if (!blog) {
            return res.status(404).json({ status: false, message: 'Blog not found' });
        }

        res.status(200).json({ status: true, message: 'Blog fetched successfully', blog });
    }
    catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({ status: false, message: 'Server error' });
    }
};