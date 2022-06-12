const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1004,
  },
  winery: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: 2023,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
    max: 100000,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    max: 100000,
  },
  image: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 1024,
  },
  unitsPurchased: {
    type: Number,
    default: 0,
  },
  sku: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 100,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
  purchases: Number,
});

const Product = mongoose.model("Product", productSchema);
exports.Product = Product;
