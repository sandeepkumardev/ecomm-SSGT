const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, require: true },
  slug: { type: String, require: true, unique: true },
});

const category = mongoose.Model("Category", categorySchema);

module.exports = category;
