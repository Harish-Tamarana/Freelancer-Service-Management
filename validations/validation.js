const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string().min(6).required().email(),
    phonenumber: Joi.string().min(10).required(),
    category: Joi.string().min(1).required(),
    password: Joi.string().min(6).required(),
    question1: Joi.string().min(1).required(),
    question2: Joi.string().min(1).required(),
    confirmpassword: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
