import { NextFunction, Request, Response } from "express";
import { UserReq } from "../models/userInterface";
import { UserStorage } from "../services/userService";
import createError from "http-errors";
import { LogTime } from "../utils/logTimeDecorator";
import { TryCatch } from "../utils/tryCatchDecorator";

export default class UserController {
  constructor(private userStorage: UserStorage) {}

  @LogTime()
  @TryCatch()
  async createUser(req: Request, res: Response): Promise<void> {
    const userReq = req.body as UserReq;
    const newUser = await this.userStorage.create(userReq);
    res.json(newUser);
  }

  @LogTime()
  @TryCatch()
  async getAutoSuggestList(req: Request, res: Response, next: NextFunction): Promise<void> {
    const loginSubstring = req.query.loginSubstring as string;
    const limit = req.query.limit as string;
    const result = await this.userStorage.getAutoSuggestList(loginSubstring, limit);
    if (result.length) {
      res.json(result);
    } else {
      next(createError(404, `No User Login with ${loginSubstring} substring has been found`));
    }
  }

  @LogTime()
  @TryCatch()
  async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    const result = await this.userStorage.findById(id);
    if (result) {
      res.json(result);
    } else {
      next(createError(404, `No User with such id=${id}`));
    }
  }

  @LogTime()
  @TryCatch()
  async updateUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    const userReq = req.body;
    const updatedUser = await this.userStorage.update(id, userReq);
    if (!updatedUser) {
      next(createError(406, `No User with such id=${id}`));
    } else {
      res.json(updatedUser);
    }
  }

  @LogTime()
  @TryCatch()
  async deleteSoftUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    const isDeleted = await this.userStorage.delete(id);
    if (!isDeleted) {
      next(createError(406, `No User with such id=${id}`));
    } else {
      res.json(`User ${id} Deleted`);
    }
  }
}
