const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

// Protected Cart Routes
router.post("/add", protect, addToCart);

router.get("/", protect, getCart);

router.put("/increase/:id", protect, increaseQuantity);

router.put("/decrease/:id", protect, decreaseQuantity);

router.delete("/:id", protect, removeFromCart);

module.exports = router;