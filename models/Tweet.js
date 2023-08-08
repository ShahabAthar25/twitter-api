const mongoose = require("mongoose");

const TweetSchema = mongoose.Schema({
  createdBy: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    default: "",
  },
  media: {
    type: String,
    default: "",
  },
  replies: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("RefreshToken", TweetSchema);
