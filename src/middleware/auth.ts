import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserStorage } from "../services/userService";
import createError from "http-errors";
import { LogTime } from "../utils/logTimeDecorator";
import { TryCatch } from "../utils/tryCatchDecorator";

export default class Auth {
  constructor(private userStorage?: UserStorage) {}

  @LogTime()
  async login(req: Request, res: Response) {
    const { login, password } = await req.body;
    const token = await this.userStorage!.login(login, password);
    if (token) {
      res.json(token);
    } else {
      const error = createError(401, "Username or password incorrect");
      res.status(error.status).send(error.message);
    }
  }

  @LogTime()
  @TryCatch()
  async checkToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      /* eslint-disable */
      jwt.verify(token, "secretword", (err, decoded) => {
        /* eslint-enable */
        if (err) {
          const error = createError(403);
          res.status(error.status).send(error.message);
        } else {
          next();
        }
      });
    } else {
      const error = createError(401);
      res.status(error.status).send(error.message);
    }
  }
}
