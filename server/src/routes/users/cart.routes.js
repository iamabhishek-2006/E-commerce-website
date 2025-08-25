const express=require("express");
const { getCartItems, addCartItems, updateCartIems, deleteCartItems } = require("../../controllers/users/cart.controllers");

const router=express.Router();

router.get("/",getCartItems);
router.post("/",addCartItems);
router.put("/:id",updateCartIems);  // update Quantity
router.delete("/:id",deleteCartItems);

module.exports=router;