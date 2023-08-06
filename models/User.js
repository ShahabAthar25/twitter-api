const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 3,
    max: 60,
  },
  email: {
    type: String,
    require: true,
    min: 3,
    max: 100,
  },
  recoveryEmail: {
    type: String,
    require: true,
    min: 3,
    max: 100,
  },
  password: {
    type: String,
    require: true,
    min: 8,
  },
  bannerPic: {
    type: String,
    default: "",
  },
  profilePic: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  website: {
    type: String,
    default: "",
  },
  bookmarked: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
