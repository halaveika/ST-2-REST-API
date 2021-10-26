import { ErrorRequestHandler } from "express";
import * as httpErrors from "http-errors";
import createError from "http-errors";
import { loggerError } from "../utils/loggerConfig";
/* eslint-disable */
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  /* eslint-enable */
  if (err instanceof httpErrors.HttpError) {
    res.status(err.statusCode).json(err.message);
  } else {
    const unhandledError = createError(500);
    loggerError.error(unhandledError.message);
    res.status(500).json(unhandledError.message);
  }
};
