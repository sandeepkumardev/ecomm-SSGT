const category = require("../../models/category");

const getCategroiesDB = async () => {
  return await category.find({});
};

const createCategoryDB = async (name, slug) => {
  const newCategory = new category({ name, slug });
  return await newCategory.save();
};

const updateCategoryDB = async (id, data) => {
  return await category.findByIdAndUpdate(id, data, { new: true });
};

const deleteCategoryDB = async (id) => {
  return await category.findByIdAndDelete(id);
};

module.exports = { getCategroiesDB, createCategoryDB, updateCategoryDB, deleteCategoryDB };
