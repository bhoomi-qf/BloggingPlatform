const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');
const likeController = require('../controller/likeBlogController');
const shareController = require('../controller/shareBlogController');
const commentController = require('../controller/commentBlogController');
const authMiddleware = require('../middleware/auth.middleware');
const { createBlogSchema, updateBlogSchema, getBlogsSchema, commentSchema } = require('../validation/blogValidation');
const validate = require('../middleware/validate');

// Blog routes
router.post('/create', authMiddleware, validate(createBlogSchema), blogController.createBlog);
router.post('/list', authMiddleware, validate(getBlogsSchema), blogController.getBlogs);
router.get('/:id', authMiddleware, blogController.getBlogById);
router.put('/:id', authMiddleware, validate(updateBlogSchema), blogController.updateBlog);
router.delete('/:id', authMiddleware, blogController.deleteBlog);

//like routes
router.post('/like/:id', authMiddleware, likeController.likeDislikeBlog);

//share routes
router.post('/share/:id', authMiddleware, shareController.shareBlog);

//comment routes
router.post('/comment/:id', authMiddleware, validate(commentSchema), commentController.addComment);
router.get('/comments/:id', authMiddleware, commentController.getComments);

module.exports = router;