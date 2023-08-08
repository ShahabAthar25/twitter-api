const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports = (payload) => {
  return jwt.sign(payload, process.env.PRIVATE_KEY, {
    expiresIn: "1d",
  });
};
