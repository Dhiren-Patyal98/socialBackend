const Post = require('../Models/post');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const createPost = async (req, res) => {
    try {
        const { userid, comment } = req.body;
        const image = req.file ? req.file.filename : ''; // Get the filename from multer
        
        if (!userid || !comment) {
            return res.status(400).json({ message: 'User ID and comment are required' });
        }

        const newPost = new Post({
            userid,
            comment,
            image
        });

        const savedPost = await newPost.save();
        res.status(201).json({ message: 'Post created successfully', post: savedPost });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};


const getAllPosts = async (req, res) => {
    try {
      
      const posts = await Post.find(); 
  
      
      res.status(200).json(posts);
    } catch (error) {
     
      res.status(500).json({ message: 'Internal server error', error });
    }
  };
  


module.exports = {
    getAllPosts,
    createPost,
    upload
};