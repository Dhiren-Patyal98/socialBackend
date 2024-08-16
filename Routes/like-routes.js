const express = require('express');
const router = express.Router();
const likeController = require('../Controllers/likeController');


router.post('/like', likeController.likePost);


router.delete('/like', likeController.unlikePost);

module.exports = router;
