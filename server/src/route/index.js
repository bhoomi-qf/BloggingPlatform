const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.route');
const blogRoutes = require('./blog.route');

router.use('/auth', authRoutes);
router.use('/blogs', blogRoutes);

module.exports = router;