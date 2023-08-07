const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const { registerValidation, loginValidation } = require("../utils/Validation");
const User = require("../models/User");
const generateAccessToken = require("../utils/generateAccessToken");

dotenv.config();

const register = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const userExist = await User.findOne({ username: req.body.username });
    if (userExist) return res.status(400).json("Username already exists");

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).json("Email already exists");

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    req.body.password = hashedPassword;

    const user = new User(req.body);

    await user.save();

    const payload = {
      _id: user._id,
      username: user.username,
    };

    const accessToken = generateAccessToken(payload);
    console.log(accessToken);

    const refreshToken = jwt.sign(user.toJSON(), process.env.PUBLIC_KEY);

    res.json({
      message: {
        user: {
          id: user._id,
          email: user.email,
          profilePic: user.profilePic,
          bannerPic: user.bannerPic,
          bio: user.bio,
          website: user.website,
          bookmarkes: user.bookmarkes,
          followers: user.followers.length,
          following: user.following.length,
        },
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).json({ error: "Invalid username" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const payload = {
      _id: user._id,
      username: user.username,
    };

    const accessToken = generateAccessToken(payload);

    const refreshToken = jwt.sign(user.toJSON(), process.env.PUBLIC_KEY);
    await refreshToken.save();

    res.json({
      message: {
        user: {
          id: user._id,
          email: user.email,
          profilePic: user.profilePic,
          bannerPic: user.bannerPic,
          bio: user.bio,
          website: user.website,
          bookmarkes: user.bookmarkes,
          followers: user.followers.length,
          following: user.following.length,
        },
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const refresh = async (req, res) => {
  try {
    res.json({ message: "Hello World" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const logout = async (req, res) => {
  try {
    res.json({ message: "Hello World" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const forgot = async (req, res) => {
  try {
    res.json({ message: "Hello World" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout,
  forgot,
};
