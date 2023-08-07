const mongoose = require("mongoose");

const RefreshTokenSchema = mongoose.Schema({
  refreshToken: {
    type: String,
  },
});

module.exports = mongoose.model("RefreshToken", RefreshTokenSchema);
