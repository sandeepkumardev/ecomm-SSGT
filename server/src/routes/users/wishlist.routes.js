const express = require("express");
const {
  getWLItems,
  addWLItem,
  deleteAllWLItems,
  deleteWLItem,
  moveToCart,
} = require("../../controllers/users/wishlist.controllers");

const router = express.Router();

router.get("/", getWLItems);
router.post("/", addWLItem);
router.delete("/delete-all", deleteAllWLItems);
router.delete("/:id", deleteWLItem);

router.put("/move-to-cart/:id", moveToCart);

module.exports = router;
