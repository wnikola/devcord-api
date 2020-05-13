const Joi = require('@hapi/joi');

const registrationSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/)
    .required()
});

const roomSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  owner: Joi.string()
    .required()
});

const Validate = schema => data => schema.validate(data);

module.exports = {
  registrationValidation: Validate(registrationSchema),
  roomValidation: Validate(roomSchema)
};