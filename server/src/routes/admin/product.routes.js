const express=require("express");
const router=express.Router();
const { getProducts, createProduct, updateProduct, deleteProduct, getProductInfo, addProductImages, deleteProductImage } = require("../../controllers/admin/product.controller");


router.get("/",getProducts);
router.get("/:slug",getProductInfo);
router.post("/",createProduct);
router.put("/:id",updateProduct);

router.delete("/image",deleteProductImage);
router.delete("/:id",deleteProduct);


router.post("/images",addProductImages);

module.exports=router;