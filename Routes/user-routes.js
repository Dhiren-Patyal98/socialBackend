const express = require('express');
const { check } = require('express-validator');
const userControllers = require('../Controllers/userController');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const upload = multer({ 
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); 
    }
  })
});

router.post('/register', upload.single('image'), [
  check('email').normalizeEmail().isEmail(),
  check('password').isLength({ min: 6 })
], userControllers.register_user);

router.post('/login', userControllers.user_login);
router.get('/getuser/:id', userControllers.get_user);
router.get('/getalluser', userControllers.get_all_users);
router.delete('/deleteuser/:id', userControllers.delete_user);

module.exports = router;
