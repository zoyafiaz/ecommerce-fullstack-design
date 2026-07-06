const Order = require("../models/Order");
const Cart = require("../models/Cart");
const User = require("../models/User");

// ===============================
// PLACE ORDER
// ===============================
const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    const cartItems = await Cart.find({ user: userId });

    if (cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    const products = cartItems.map((item) => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
    }));

    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      userId,
      products,
      totalPrice,
      status: "Pending",
    });

    await Cart.deleteMany({ user: userId });

    res.status(201).json({
      message: "Order placed successfully!",
      order,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// USER ORDERS
// ===============================
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// ADMIN - GET ALL ORDERS
// ===============================
const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find().sort({
      createdAt: -1,
    });

    const ordersWithUsers = await Promise.all(
      orders.map(async (order) => {

        const user = await User.findById(order.userId);

        return {
          ...order._doc,
          customer: user ? user.name : "Unknown",
          email: user ? user.email : "",
        };
      })
    );

    res.json(ordersWithUsers);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// UPDATE ORDER STATUS
// ===============================
const updateOrderStatus = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = "Delivered";

    await order.save();

    res.json({
      message: "Order Delivered Successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  placeOrder,
  getOrders,
  getAllOrders,
  updateOrderStatus,
};