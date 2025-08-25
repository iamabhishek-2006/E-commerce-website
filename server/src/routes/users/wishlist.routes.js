const express=require("express");
const { getWishlist, addWishlist, deleteWishlist, deleteWishlistAll } = require("../../controllers/users/wishlist.controllers");

const router=express.Router();

router.get("/",getWishlist)
router.post("/",addWishlist);
router.put("/:id", deleteWishlist);
router.delete("/:id",deleteWishlistAll);

module.exports=router;

