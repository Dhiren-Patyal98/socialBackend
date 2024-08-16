const User = require("../Models/users");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require('fs');

const securePassword = async (password) => {
  try {
    const passwordHash = await bcryptjs.hash(password, 10);
    return passwordHash;
  } catch (error) {
    throw new Error(error.message);
  }
};

const register_user = async (req, res) => {
  try {
    const spassword = await securePassword(req.body.password);
    const image = req.file ? req.file.path : ''; 

    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      password: spassword,
      usertype: "user",
      image: image,
    });

    const useremail = await User.findOne({ email: req.body.email });
    const userphone = await User.findOne({ phone: req.body.phone });

    if (useremail) {
      return res.status(400).send({ success: false, msg: "This email already exists" });
    } else if (userphone) {
      return res.status(400).send({ success: false, msg: "This phone number already exists" });
    } else {
      const user_data = await newUser.save();
      return res.status(201).send({ success: true, data: user_data });
    }
  } catch (error) {
    return res.status(400).send({ success: false, msg: error.message });
  }
};

const create_token = async (id) => {
  try {
    const token = await jwt.sign({ _id: id }, "thisisthesecretkey", { expiresIn: '1h' });
    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};

const user_login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    let userData;

    if (email) {
      userData = await User.findOne({ email });
    } else if (phone) {
      userData = await User.findOne({ phone });
    }

    if (userData) {
      const passwordMatch = await bcryptjs.compare(password, userData.password);

      if (passwordMatch) {
        const tokenData = await create_token(userData._id);

        const userResult = {
          _id: userData._id,
          firstname: userData.firstname,
          lastname: userData.lastname,
          email: userData.email,
          phone: userData.phone,
          usertype: userData.usertype,
          image: userData.image,
          token: tokenData,
        };

        return res.status(200).send({
          success: true,
          msg: "Login successful",
          data: userResult,
        });
      } else {
        return res.status(400).send({ success: false, msg: "Login details are incorrect" });
      }
    } else {
      return res.status(400).send({ success: false, msg: "Login details are incorrect" });
    }
  } catch (error) {
    return res.status(400).send({ success: false, msg: error.message });
  }
};

const get_user = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (user) {
      return res.json({ data: user });
    } else {
      return res.status(404).send({ success: false, msg: "User not found" });
    }
  } catch (error) {
    return res.status(400).send({ success: false, msg: error.message });
  }
};

const get_all_users = async (req, res) => {
  try {
   
    const users = await User.find();

    if (users.length > 0) {
      return res.json({ data: users });
    } else {
      return res.status(404).send({ success: false, msg: "No users found" });
    }
  } catch (error) {
    return res.status(400).send({ success: false, msg: error.message });
  }
};


const delete_user = async (req, res) => {
  try {
    const userId = req.params.id;
    const userToDelete = await User.findByIdAndDelete(userId);

    if (userToDelete) {
      if (userToDelete.image) {
        fs.unlink(userToDelete.image, (err) => {
          if (err) console.error('Failed to delete image:', err);
        });
      }
      return res.status(200).send({ success: true, msg: "User deleted successfully" });
    } else {
      return res.status(404).send({ success: false, msg: "User not found" });
    }
  } catch (error) {
    return res.status(400).send({ success: false, msg: error.message });
  }
};

exports.get_user = get_user;
exports.delete_user = delete_user;
exports.user_login = user_login;
exports.register_user = register_user;
exports.get_all_users = get_all_users;