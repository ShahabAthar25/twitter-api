const mongoose = require("mongoose");

const HashTagSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("HashTag", HashTagSchema);
