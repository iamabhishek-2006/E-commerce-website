const category = require("../../models/category");

const getCategroiesDB = async () => {
  return await category.find({});
};

const createCategoryDB = async (name, slug) => {
  const newCategory = new category({ name, slug });
  return await newCategory.save();
};

module.exports = { getCategroiesDB, createCategoryDB };
