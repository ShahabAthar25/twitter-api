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
    username: Joi.string().required(),
    email: Joi.string().required(),
    recoveryEmail: Joi.string().required(),
    password: Joi.string().required(),
    profilePic: Joi.string().required(),
    bannerPic: Joi.string().required(),
    bio: Joi.string().required(),
    website: Joi.string().required(),
  });

  return schema.validate(data);
};
