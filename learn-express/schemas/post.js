const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema({
  title: {
    type: String,
    requried: true,
  },
  content: {
    type: String,
    requried: true,
  },
  nickname: {
    type: String,
    requried: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", userSchema);
