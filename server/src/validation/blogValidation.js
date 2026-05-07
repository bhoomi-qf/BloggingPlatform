const Joi = require('joi');

exports.createBlogSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    sort_content: Joi.string().min(10).max(300).required(),
    content: Joi.string().min(10).required(),
    tags: Joi.array().items(Joi.string()),
    facebook_link: Joi.string().uri(),
    instagram_link: Joi.string().uri(),
    twitter_link: Joi.string().uri(),
    linkedin_link: Joi.string().uri(),
    conclusion: Joi.string().min(10).required(),
});

exports.updateBlogSchema = Joi.object({
    title: Joi.string().min(3).max(100),
    sort_content: Joi.string().min(10).max(300),
    content: Joi.string().min(10),
    tags: Joi.array().items(Joi.string()),
    facebook_link: Joi.string().uri(),
    instagram_link: Joi.string().uri(),
    twitter_link: Joi.string().uri(),
    linkedin_link: Joi.string().uri(),
    conclusion: Joi.string().min(10),
});

exports.getBlogsSchema = Joi.object({
    search: Joi.string().min(3).max(100),
    is_author: Joi.boolean(),
    pageNo: Joi.number().integer().min(1).default(1),
    pageSize: Joi.number().integer().min(1).max(100).default(10),
    sortBy: Joi.string().valid('created_at', 'title', 'likes', 'shares').default('created_at'),
});

exports.commentSchema = Joi.object({
    content: Joi.string().min(1).required(),
});