import Joi from "joi";

const groupSchema = Joi.object().keys({
  name: Joi.string().required(),
  permissions: Joi.array().items(
    Joi.string()
      .regex(/\bREAD\b|\bWRITE\b|\bDELETE\b|\bSHARE\b|\bUPLOAD_FILES\b/)
      .required()
  ),
});

export default groupSchema;
