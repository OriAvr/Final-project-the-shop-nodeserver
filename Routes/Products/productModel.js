const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  wineName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  wineType: { type: String, required: true, required: true },
  wineDescription: {
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
  wineYear: {
    type: Number,
    required: true,
    min: 1900,
    max: 2023,
  },
  winePrice: {
    type: Number,
    required: true,
    min: 1,
    max: 100000,
  },
  wineStock: {
    type: Number,
    required: true,
    min: 0,
    max: 100000,
  },
  wineImage: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 1024,
  },
  unitsPurchased: {
    type: Number,
    default: 0,
  },
  wineSKU: {
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
