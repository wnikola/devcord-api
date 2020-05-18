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
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
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

const joinRoomSchema = Joi.object({
  room: Joi.string()
    .required(),
  username: Joi.string()
    .required()
});

const deleteRoomSchema = Joi.object({
  room: Joi.string()
    .required(),
  username: Joi.string()
    .required()
});

const messageSchema = Joi.object({
  from: Joi.string()
    .required(),
  to: Joi.string()
    .required(),
  message: Joi.string()
    .required()
})

const Validate = schema => data => schema.validate(data);

module.exports = {
  registrationValidation: Validate(registrationSchema),
  roomValidation: Validate(roomSchema),
  joinRoomValidation: Validate(joinRoomSchema),
  deleteRoomValidation: Validate(deleteRoomSchema),
  messageValidation: Validate(messageSchema)
};