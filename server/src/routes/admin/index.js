const categoryRoutes = require("./category.routes");
const express = require("express");

const router = express.Router();

router.use("/category", categoryRoutes);
// router.use("/product", )

module.exports = router;
