const express = require("express");
const router = express.Router();

const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

// ===============================
// Get Logged-in User Profile
// ===============================
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "User profile data",
    user: req.user,
  });
});

// ===============================
// Get All Users
// ===============================
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;