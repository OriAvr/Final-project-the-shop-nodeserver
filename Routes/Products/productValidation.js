const { date } = require("joi");
const Joi = require("joi");

function validateProduct(product) {
  const schema = Joi.object({
    productName: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(10).max(1024).required(),
    winery: Joi.string().min(2).max(100).required(),
    year: Joi.number().min(1900).max(2022).required(),
    price: Joi.number().min(1).max(100000).required(),
    stock: Joi.number().min(0).max(100000).required(),
    image: Joi.string().min(11).max(256),
    sku: Joi.string().min(10).max(100).required(),
  });
  return schema.validate(product);
}
exports.validateProduct = validateProduct;
