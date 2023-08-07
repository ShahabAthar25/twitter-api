const mongoose = require("mongoose");

const RefreshTokenSchema = mongoose.Schema({
  refreshToken: {
    type: String,
    require: true,
  },
  user: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("RefreshToken", RefreshTokenSchema);
