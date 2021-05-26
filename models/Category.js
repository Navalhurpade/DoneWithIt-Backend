const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: String,
  icon: String,
  backgroundColor: String,
  color: String,
});

const Category = new mongoose.model("Category", categorySchema);

module.exports = Category;
