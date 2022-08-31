const { date } = require("joi");
const Joi = require("joi");

function validateProduct(product) {
  const schema = Joi.object({
    wineName: Joi.string().min(2).max(256).required(),
    wineType: Joi.string().min(3).max(5).required(),
    wineDescription: Joi.string().min(10).max(1024).required(),
    winery: Joi.string().min(2).max(100).required(),
    wineYear: Joi.number().min(1900).max(2022).required(),
    winePrice: Joi.number().min(1).max(100000).required(),
    wineStock: Joi.number().min(0).max(100000).required(),
    wineImage: Joi.string().min(11).max(256),
    wineSKU: Joi.string().min(10).max(100).required(),
  });
  return schema.validate(product);
}
exports.validateProduct = validateProduct;
