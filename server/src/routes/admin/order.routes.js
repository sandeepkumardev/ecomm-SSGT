const express = require("express");
const { getAllOrders, updateOrderStatus } = require("../../controllers/admin/order.controller");

const router = express.Router();

router.get("/", getAllOrders);
router.put("/:id", updateOrderStatus);

module.exports = router;
