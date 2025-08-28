const express = require("express");
const { getOrders, createOrder, cancelOrder } = require("../../controllers/users/order.controllers");
const router = express.Router();

router.get("/", getOrders);
// router.get("/:id", getOrderDetail);
router.post("/", createOrder);
router.put("/cancel/:id", cancelOrder);

module.exports = router;
