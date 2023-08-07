const Joi = require("@hapi/joi");

module.exports.registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(60),
    email: Joi.string().required().min(3).max(60).email(),
    recoveryEmail: Joi.string().required().min(3).max(60).email(),
    password: Joi.string().required().min(8),
  });

  return schema.validate(data);
};

module.exports.loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports.updateUserValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string(),
    email: Joi.string(),
    recoveryEmail: Joi.string(),
    password: Joi.string(),
    profilePic: Joi.string(),
    bannerPic: Joi.string(),
    bio: Joi.string(),
    website: Joi.string(),
  });

  return schema.validate(data);
};
