const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });

  jwt.verify(token, process.env.PRIVATE_KEY, async (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Access token has expired" });
    }

    req.user = user;
    next();
  });
};
