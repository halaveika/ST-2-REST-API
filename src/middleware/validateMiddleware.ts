import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import createError from "http-errors";

function errorResponse(schemaErrors: Joi.ValidationErrorItem[]) {
  const errors = schemaErrors.map(error => {
    const { path, message } = error;
    return { path, message };
  });
  return {
    status: "failed",
    errors,
  };
}

function validateMiddleware(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
    });

    if (error?.isJoi) {
      next(createError(400, `${JSON.stringify(errorResponse(error.details).errors)}`));
    } else {
      next();
    }
  };
}

export default validateMiddleware;
