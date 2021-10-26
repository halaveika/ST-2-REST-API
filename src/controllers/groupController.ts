import { Request, Response, NextFunction } from "express";
import { GroupStorage } from "../services/groupService";
import createError from "http-errors";
import { LogTime } from "../utils/logTimeDecorator";
import { TryCatch } from "../utils/tryCatchDecorator";

export default class GroupController {
  constructor(private groupStorage: GroupStorage) {}

  @LogTime()
  @TryCatch()
  async createGroup(req: Request, res: Response): Promise<void> {
    const { name, permissions } = req.body;
    const newGroup = await this.groupStorage.create({ name, permissions });
    res.json(newGroup);
  }

  @LogTime()
  @TryCatch()
  async getAll(req: Request, res: Response): Promise<void> {
    const groups = await this.groupStorage.getAll();
    res.json(groups);
  }

  @LogTime()
  @TryCatch()
  async getGroupById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const group = await this.groupStorage.getById(id);
    if (group) {
      res.json(group);
    } else {
      next(createError(406, `No Group with such id=${id}`));
    }
  }

  @LogTime()
  @TryCatch()
  async updateGroupById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const { name, permissions } = req.body;
    const updatedGroup = await this.groupStorage.update(id, { name, permissions });
    if (!updatedGroup) {
      next(createError(406, `No Group with such id=${id}`));
    } else {
      res.json(updatedGroup);
    }
  }

  @LogTime()
  @TryCatch()
  async deleteGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const isDeleted = await this.groupStorage.delete(id);
    if (!isDeleted) {
      next(createError(406, `No Group with such id=${id}`));
    } else {
      res.json(`Group ${id} Deleted`);
    }
  }

  @LogTime()
  @TryCatch()
  async addUsersToGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { group, users } = req.body;
    const result = await this.groupStorage.addUsersToGroup(group, users);
    if (result) {
      res.json(result);
    } else {
      next(createError(406, `transaction faild`));
    }
  }
}
