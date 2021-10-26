import { Request, Response, NextFunction } from "express";
import { loggerInfo } from "../utils/loggerConfig";

export const serviceLogger = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { method, path, body, params, query } = req;
    loggerInfo.info(
      `method: ${method},router: ${path},body: ${JSON.stringify(body)}` +
        `,params: ${JSON.stringify(params)},query-params: ${JSON.stringify(query)}, `
    );
    next();
  } catch (e) {
    loggerInfo.info("logger failed");
    res.send("Oh no, something did not go well!");
  }
};
