const { getAllUsers } = require("../../controllers/admin/user.controllers");
const categoryRoutes = require("./category.routes");
const productRoutes=require("./product.routes");
const express = require("express");

const router = express.Router();

router.use("/category", categoryRoutes);
router.use("/product",productRoutes );
router.use("/order",require("./order.routes"))
router.get("/users",getAllUsers);
router.use("/user", require("./users.routes"));

module.exports = router;

