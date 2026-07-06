require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const Product = require("./models/Product");
const User = require("./models/User");
const Order = require("./models/Order");

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ===============================
// Connect Database
// ===============================
connectDB();

// ===============================
// Middleware
// ===============================
app.use(cors());
app.use(express.json());

// ===============================
// Static Images
// ===============================
app.use("/images", express.static(path.join(__dirname, "public/images")));

// ===============================
// Home Route
// ===============================
app.get("/", (req, res) => {
  res.send("Backend Server Running Successfully!");
});

// ===============================
// PRODUCTS API
// ===============================

// Get All Products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching products",
    });
  }
});

// Get Single Product
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// ===============================
// Add Product
// ===============================
app.post("/api/products", async (req, res) => {
  try {
    const { name, price, image, description, category, stock } = req.body;

    const lastProduct = await Product.findOne().sort({ id: -1 });

    const newId = lastProduct ? lastProduct.id + 1 : 1;

    const product = new Product({
      id: newId,
      name,
      price,
      image,
      description,
      category,
      stock: stock || 0,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ===============================
// Delete Product
// ===============================
app.delete("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ===============================
// Update Product
// ===============================
app.put("/api/products/:id", async (req, res) => {
  try {
    const { name, price, image, description, category, stock } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        image,
        description,
        category,
        stock,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product Updated Successfully",
      product: updatedProduct,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ===============================
// DASHBOARD API
// ===============================
app.get("/api/dashboard", async (req, res) => {
  try {

    // Dashboard Counts
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Revenue
    const revenueResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    const totalRevenue =
      revenueResult.length > 0
        ? revenueResult[0].totalRevenue
        : 0;

    // Recent Orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // Latest Users
    const latestUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email role");

      // Low Stock Products
const lowStockProducts = await Product.find({
  stock: { $lt: 5 },
})
  .select("name stock")
  .limit(5);

    // Send Data
    res.json({
  totalProducts,
  totalUsers,
  totalOrders,
  totalRevenue,
  recentOrders,
  latestUsers,
  lowStockProducts,
});

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// ===============================
// ROUTES
// ===============================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// ===============================
// Start Server
// ===============================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});