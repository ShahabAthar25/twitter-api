const bcrypt = require("bcrypt");

const User = require("../models/User");
const { updateUserValidation } = require("../utils/Validation");
const RefreshToken = require("../models/RefreshToken");

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });

    const bookmarks = [];

    res.json({
      message: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
        bannerPic: user.bannerPic,
        bio: user.bio,
        website: user.website,
        bookmarks,
        following: user.following.length,
        followers: user.followers.length,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    const bookmarks = [];

    res.json({
      message: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
        bannerPic: user.bannerPic,
        bio: user.bio,
        website: user.website,
        bookmarks,
        following: user.following.length,
        followers: user.followers.length,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  const { error } = updateUserValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const user = await User.findOne({ _id: req.user._id });

    if (req.body.username) {
      const usernameExists = await User.findOne({
        username: req.body.username,
      });

      if (usernameExists) {
        res.status(400).json({ error: "Username already exists" });
      }
    }

    if (req.body.email) {
      const emailExists = await User.findOne({
        email: req.body.email,
      });

      if (emailExists) {
        res.status(400).json({ error: "Email already exists" });
      }
    }

    if (req.body.password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      req.body.password = hashedPassword;
    }

    await user.updateOne(req.body);

    res.json({ message: "User has been successfully updated" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.user._id });
    await RefreshToken.deleteMany({ user: req.user._id });

    res.json({ message: "User successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const follow = async (req, res) => {
  try {
    res.json({ message: "Hello World" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getCurrentUser,
  getUser,
  updateUser,
  deleteUser,
  follow,
};
