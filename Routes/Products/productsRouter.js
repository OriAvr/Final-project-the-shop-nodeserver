const { Product } = require("./productModel");
const express = require("express");
const auth = require("../../middlewares/authorization");
const router = express.Router();
const chalk = require("chalk");
const res = require("express/lib/response");
const { validateProduct } = require("./productValidation");

/********** סעיף 7 **********/
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

// /********** סעיף 9 **********/
// router.get("/my-cards", auth, (req, res) => {
//   let user = req.user;
//   if (!user.biz) return res.status(403).json("Un authorize user!");

//   Card.find({ userID: user._id })
//     .then((cards) => res.json(cards))
//     .catch((error) => res.status(500).send(error.message));
// });

/********** סעיף 10 **********/
router.post("/", auth, async (req, res) => {
  // try {
  //   const user = req.user;
  //   if (!user.biz) {
  //     console.log(
  //       chalk.redBright("A non biz user attempted to add a product!")
  //     );
  //     return res.status(403).json("Un authorize user!");
  //   }
  try {
    let product = req.body;
    const { error } = validateProduct(product);
    if (error) {
      console.log(chalk.redBright(error.details[0].message));
      return res.status(400).send(error.details[0].message);
    }

    product = {
      productName: product.productName,
      description: product.description,
      winery: product.winery,
      year: product.year,
      price: product.price,
      stock: product.stock,
      unitsPurchased: product.unitsPurchased,
      sku: product.sku,
      image: product.image
        ? product.image
        : "https://www.clipartmax.com/png/middle/138-1385247_enter-online-store-empty-wine-bottle-black.png",
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
