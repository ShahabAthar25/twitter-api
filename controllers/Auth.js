const { registerValidation } = require("../utils/Validation");

const register = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  try {
    res.json({ message: "Hello World" });
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
