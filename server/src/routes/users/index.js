const express = require("express");
const authRoutes = require("./auth.routes");
const orderRoutes = require("./order.routes");
const addressRoutes = require("./address.routes");

const authMiddleware = require("../../middlewares/auth.middleware");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/address", authMiddleware, addressRoutes);
router.use("/order", authMiddleware, orderRoutes);

module.exports = router;
