const categoryRoutes = require("./category.routes");
const productRoutes = require("./product.routes");
const express = require("express");

const router = express.Router();

router.use("/category", categoryRoutes);
router.use("/product", productRoutes);

module.exports = router;
