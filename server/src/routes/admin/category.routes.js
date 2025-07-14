const express = require("express");
const {
  getCategroies,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../../controllers/admin/category.controller");
const router = express.Router();

router.get("/", getCategroies);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
