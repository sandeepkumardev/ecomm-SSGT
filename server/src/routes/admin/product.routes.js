const express = require("express");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductInfo,
} = require("../../controllers/admin/product.controllers");
const router = express.Router();

router.get("/", getProducts);
router.get("/:slug", getProductInfo);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
