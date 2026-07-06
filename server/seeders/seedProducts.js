require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");
const products = require("../data/products");

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("✅ Products Added Successfully");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedProducts();