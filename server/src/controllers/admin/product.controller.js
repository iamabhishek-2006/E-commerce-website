const {
  getProductsDB,
  updataProductDB,
  deleteProductDB,
  createProductDB,
  getProductInfoDB,
  addProductImagesDB,
  deleteProductImageDB,
} = require("../../services/admin/product.services");
const { generateSlug } = require("../../utils");
const { deleteImage } = require("../../utils/cloudinary");

const getProductInfo = async (req, res) => {
  const { slug } = req.params;
  const data = await getProductInfoDB({ slug });
  return res.json({ success: true, data });
};

const getProducts = async (req, res) => {
  const data = await getProductsDB();
  return res.json({
    success: true,
    data: data,
  });
};

const createProduct = async (req, res) => {
  const { title, description, price, mrp, rating, stock, category } = req.body;

  if (
    !title ||
    !description ||
    !price ||
    !mrp ||
    !rating ||
    !stock ||
    !category
  ) {
    return res.json({
      success: false,
      error: "All fields are required",
      required: [
        "title",
        "description",
        "price",
        "mrp",
        "rating",
        "stock",
        "category",
      ],
    });
  }
  const slug = generateSlug(title);
  try {
    const data = await createProductDB({
      title,
      slug,
      description,
      price,
      mrp,
      rating,
      category,
      stock,
    });
    return res.json({
      success: true,
      message: "Product create successfully",
      data: data,
    });
  } catch (error) {
    if (error.code == 11000) {
      return res.json({ success: false, error: "Product already exists" });
    }
    return res.json({ success: false, error: "something went wrong" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  if (body.title) {
    body.slug = generateSlug(body.title);
  }

  try {
    const data = await updataProductDB(id, body);
    return res.json({ success: true, data: data });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ success: false, error: "Product already exists" });
    }
    return res.json({ success: false, error: "something went wrong" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteProductDB(id);
    return res.json({ success: true, data: "Product deleted successfully" });
  } catch (error) {
    return res.json({ success: false, error: "something went wrong" });
  }
};

const addProductImages = async (req, res) => {
  const { images } = req.body;

  if (!images) {
    return res.json({
      success: false,
      erorr: "All fields are required",
      required: ["images"],
    });
  }
  try {
    const data = await addProductImagesDB(images);
    return res.json({ success: true, data });
  } catch (error) {
    return res.json({ success: false, error: "something went wrong" });
  }
};

const deleteProductImage = async (req, res) => {
  const { public_id } = req.body;

  console.log(public_id);

  if (!public_id) {
    return res.json({
      success: false,
      error: "All fields are required",
      required: ["public_id"],
    });
  }

  try {
    // delete from cloudinary
    const result = await deleteImage(public_id);
    console.log(result);
    if (!result.success) {
      return res.json({
        success: false,
        erorr: result.error || "something went wrong",
      });
    }

    // delete from db
    await deleteProductImageDB(public_id);
    return res.json({ success: true, data: "Image delete successfully" });
  } catch (error) {
    return res.json({ success: false, error: "something went wrong" });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductInfo,
  addProductImages,
  deleteProductImage,
};
