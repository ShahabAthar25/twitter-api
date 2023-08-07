const bcrypt = require("bcrypt");

const User = require("../models/User");
const { updateUserValidation } = require("../utils/Validation");

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });

    res.json({ message: user });
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
    res.json({ message: "Hello World" });
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

const unfollow = async (req, res) => {
  try {
    res.json({ message: "Hello World" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  follow,
  unfollow,
};
