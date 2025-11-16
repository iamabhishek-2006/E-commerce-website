const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    slug: { type: String, require: true, unique: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    mrp: { type: Number, require: true },
    rating: { type: Number, require: true },
    stock: { type: Number, require: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      require: true,
    },
    // images: [{ type:mongoose.Schema.Types.ObjectId ,ref:"Image" }],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
