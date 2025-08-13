const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", require: true },
  public_id: { type: String, require: true },
  url: { type: String, require: true },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
