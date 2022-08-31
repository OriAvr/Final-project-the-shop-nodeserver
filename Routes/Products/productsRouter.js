const { Product } = require("./productModel");
const express = require("express");
const auth = require("../../middlewares/authorization");
const router = express.Router();
const chalk = require("chalk");
const { validateProduct } = require("./productValidation");

router.get("/allproducts", async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products);
    return res.send(products);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

// Retrieving Product Info
router.get("/product/:sku", async (req, res) => {
  try {
    const productSKU = req.params.sku;
    const product = await Product.findOne({ productSKU: productSKU });

    return res.send(product);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

router.post("/add", auth, async (req, res) => {
  try {
    let product = {
      wineName: req.body.wineName,
      wineType: req.body.wineType,
      wineDescription: req.body.wineDescription,
      winery: req.body.winery,
      wineYear: req.body.wineYear,
      winePrice: req.body.winePrice,
      wineStock: req.body.wineStock,
      wineSKU: req.body.wineSKU,
      wineImage: req.body.wineImage,
    };
    console.log(product);
    const { error } = validateProduct(product);
    if (error) {
      console.log(chalk.redBright(error.details[0].message));
      return res.status(400).send(error.details[0].message);
    }

    product = {
      wineName: product.wineName,
      wineDescription: product.wineDescription,
      wineType: product.wineType,
      winery: product.winery,
      wineYear: product.wineYear,
      winePrice: product.winePrice,
      wineStock: product.wineStock,
      wineSKU: product.wineSKU,
      wineImage: product.wineImage,
    };

    product = new Product(product);
    await product.save();
    return res.send(product);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

module.exports = router;
