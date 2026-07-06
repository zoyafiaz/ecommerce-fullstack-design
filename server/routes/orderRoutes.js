const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  placeOrder,
  getOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

// ===============================
// USER ROUTES
// ===============================

// Place Order
router.post("/", protect, placeOrder);

// User Order History
router.get("/", protect, getOrders);

// ===============================
// ADMIN ROUTES
// ===============================

// Get All Orders
router.get("/all", protect, getAllOrders);

// Update Order Status
router.put("/:id", protect, updateOrderStatus);

module.exports = router;