const express = require('express');
const { getAllPosts, createPost, upload } = require('../Controllers/postController');
const router = express.Router();

router.post('/create', upload.single('image'), createPost);

router.get('/getpost', getAllPosts);

module.exports = router;