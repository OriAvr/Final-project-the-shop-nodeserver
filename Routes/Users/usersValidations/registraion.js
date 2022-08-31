const Joi = require("Joi");

function validateRegistration(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(8).max(1024).required(),
    favorites: Joi.array().items(Joi.object().keys({ sku: Joi.string() })),
    isAdmin: Joi.boolean(),
    adminPassword: Joi.string(),
  });

  return schema.validate(user);
}

module.exports = validateRegistration;
