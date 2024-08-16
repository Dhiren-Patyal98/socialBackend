const Like = require('../Models/like');


exports.likePost = async (req, res) => {
    try {
        const { userid, postid } = req.body;

        
        const existingLike = await Like.findOne({ userid, postid });
        if (existingLike) {
            return res.status(400).json({ message: 'Already liked' });
        }

        
        const newLike = new Like({ userid, postid });
        await newLike.save();

        res.status(201).json(newLike);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.unlikePost = async (req, res) => {
    try {
        const { userid, postid } = req.body;

       
        const deletedLike = await Like.findOneAndDelete({ userid, postid });
        if (!deletedLike) {
            return res.status(404).json({ message: 'Like not found' });
        }

        res.status(200).json(deletedLike);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
