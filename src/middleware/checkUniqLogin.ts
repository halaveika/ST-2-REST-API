import { Request, Response, NextFunction } from "express";
import { UserReq } from "../models/userInterface";
import { UserStorage } from "../services/userService";
import createError from "http-errors";
import { LogTime } from "../utils/logTimeDecorator";
import { TryCatch } from "../utils/tryCatchDecorator";

export class CheckUniqLogin {
  constructor(private userStorage: UserStorage) {}

  @LogTime()
  @TryCatch()
  async check(req: Request, res: Response, next: NextFunction): Promise<void> {
    const user = req.body as UserReq;
    const isLogin = await this.userStorage.getUserByLogin(user.login);
    if (isLogin) {
      next(createError(400, `This login is not uniq`));
    } else {
      next();
    }
  }
}
