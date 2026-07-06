const Cart = require("../models/Cart");

// ===============================
// ADD TO CART
// ===============================
const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { _id, name, price, image } = req.body;

    let cartItem = await Cart.findOne({
      user: userId,
      productId: _id,
    });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        user: userId,
        productId: _id,
        name,
        price,
        image,
        quantity: 1,
      });
    }

    res.json({
      message: "Product added to cart",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// GET CART
// ===============================
const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({
      user: req.user._id,
    });

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// INCREASE QUANTITY
// ===============================
const increaseQuantity = async (req, res) => {
  try {
    const item = await Cart.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    item.quantity += 1;

    await item.save();

    res.json(item);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// DECREASE QUANTITY
// ===============================
const decreaseQuantity = async (req, res) => {
  try {
    const item = await Cart.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    if (item.quantity > 1) {
      item.quantity -= 1;
      await item.save();
      return res.json(item);
    }

    await Cart.findByIdAndDelete(req.params.id);

    res.json({
      message: "Item removed from cart",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// REMOVE ITEM
// ===============================
const removeFromCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.json({
      message: "Item removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
};