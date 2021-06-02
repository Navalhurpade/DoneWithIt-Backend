const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  listings: { type: Number, default: 0 },
  gender: Number,
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
