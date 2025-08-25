const Image = require("../../models/images");
const Product = require("../../models/product");
const { deleteFolder } = require("../../utils/cloudinary");

const getProductInfoDB = async ({ slug }) => {
  const product = await Product.findOne({ slug }).populate("category");
  const images = await Image.find({ product_id: product._id });
  return { ...product._doc, images };
};

const getProductsDB = async () => {
  return await Product.find().populate("category");
};

const createProductDB = async (data) => {
  const newProduct = new Product(data);
  return (await newProduct.save()).populate("category");
};

const updataProductDB = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

const deleteProductDB = async (id) => {
  // product folder path
  const folderPath = `E-commerce/${id}`;

  // delete from cloudinary
  await deleteFolder(folderPath);
  // if (!result.success) return null;

  // delete from db
  await Image.deleteMany({ product_id: id });

  // delete product
  return await Product.findByIdAndDelete(id);
};

const addProductImagesDB = async (data) => {
  return await Image.insertMany(data);
};

const deleteProductImageDB = async (public_id) => {
  return await Image.findOneAndDelete({ public_id });
};

module.exports = {
  getProductsDB,
  createProductDB,
  updataProductDB,
  deleteProductDB,
  getProductInfoDB,
  addProductImagesDB,
  deleteProductImageDB,
};
