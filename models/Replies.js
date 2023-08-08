const mongoose = require("mongoose");

const RepliesSchema = mongoose.Schema({
  createdBy: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  post: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    default: "",
    max: 140,
  },
  media: {
    type: String,
    default: "",
  },
  replies: {
    type: Array,
    default: [],
  },
  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Replies", RepliesSchema);
