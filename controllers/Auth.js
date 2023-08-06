const bcrypt = require("bcrypt");

const { registerValidation } = require("../utils/Validation");
const User = require("../models/User");

const register = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

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

    res.json({ message: "User successfully created." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const login = async (req, res) => {
  try {
    res.json({ message: "Hello World" });
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
