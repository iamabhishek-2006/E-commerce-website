const express=require("express");
const { fetchAddress, addAddress, updateAddress, deleteAddress } = require("../../controllers/users/address.controllers");

const router=express.Router();

router.get("/",fetchAddress);
router.post("/",addAddress);
router.put("/:id",updateAddress);
router.delete("/:id",deleteAddress);

module.exports=router;