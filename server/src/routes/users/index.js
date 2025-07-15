const express = require("express");
const authRoutes = require("./auth.routes");
const orderRoutes = require("./order.routes");
const addressRoutes = require("./address.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/address", addressRoutes);
router.use("/order", orderRoutes);

module.exports = router;
