const express = require("express");
const authRoutes = require("../auth.routes");
const orderRoutes = require("./order.routes");
const addressRoutes = require("./address.router");
const authMiddlewares = require("../../middlewares/auth.middlewares");
const { getProfile } = require("../../controllers/users/profile.controllers");
const cartRoutes=require("./cart.routes");
const wishlistRoutes=require("./wishlist.routes");

const router = express.Router();

router.get("/me", authMiddlewares,getProfile);
router.use("/address", authMiddlewares, addressRoutes);
router.use("/order", authMiddlewares, orderRoutes);
router.use("/cart",cartRoutes);
router.use("/wishlist",wishlistRoutes);

module.exports = router;
