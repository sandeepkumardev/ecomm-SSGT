const Product = require("../../models/product");

const getProductInfoDB = async ({ slug }) => {
  return await Product.findOne({ slug }).populate("category");
};

const getProductsDB = async () => {
  return await Product.find({}).populate("category");
};

const createProductDB = async (data) => {
  const newProduct = new Product(data);
  return await newProduct.save();
};

const updateProductDB = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

const deleteProductDB = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = { getProductInfoDB, getProductsDB, createProductDB, updateProductDB, deleteProductDB };
