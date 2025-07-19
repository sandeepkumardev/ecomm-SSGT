const express = require("express");
const orderRoutes = require("./order.routes");
const addressRoutes = require("./address.routes");
const { getProfile } = require("../../controllers/users/auth.controllers");

const router = express.Router();

router.get("/me", getProfile);

router.use("/address", addressRoutes);
router.use("/order", orderRoutes);

module.exports = router;
