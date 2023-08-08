const Joi = require("@hapi/joi");

module.exports.registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(60),
    name: Joi.string().required().min(3).max(60),
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
    username: Joi.string().min(3).max(60),
    name: Joi.string(),
    email: Joi.string().min(3).max(60).email(),
    recoveryEmail: Joi.string().min(3).max(60).email(),
    password: Joi.string().min(8),
    profilePic: Joi.string(),
    bannerPic: Joi.string(),
    bio: Joi.string().max(150),
    website: Joi.string(),
  });

  return schema.validate(data);
};

module.exports.createTweetValidation = (data) => {
  const schema = Joi.object({
    text: Joi.string().max(140),
    file: Joi.object({
      mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
      size: Joi.number()
        .max(5 * 1024 * 1024)
        .required(),
    }),
  }).or("text", "file");

  return schema.validate(data);
};

module.exports.updateTweetValidation = (data) => {
  const schema = Joi.object({
    text: Joi.string().max(140),
    file: Joi.object({
      mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
      size: Joi.number()
        .max(5 * 1024 * 1024)
        .required(),
    }),
  }).or("text", "file");

  return schema.validate(data);
};
