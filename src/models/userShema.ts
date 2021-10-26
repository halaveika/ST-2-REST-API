import Joi from "joi";

const userSchema = Joi.object().keys({
  login: Joi.string()
    .regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/)
    .required(),
  password: Joi.string()
    .regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/)
    .required(),
  age: Joi.number().min(4).max(130).required(),
});

export default userSchema;
