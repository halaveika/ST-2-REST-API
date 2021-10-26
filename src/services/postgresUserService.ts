import jwt from "jsonwebtoken";
import { IUser } from "../models/userInterface";
import { UserReq } from "../models/userInterface";
import { UserStorage } from "./userService";
import { sortUsers } from "../utils/sortUsers";
import { v4 as uuidv4 } from "uuid";
import { validate as uuidValidate } from "uuid";
import { Like } from "typeorm";
import { UserRepository } from "../repositories/userRepository";

export class PostgresUserService implements UserStorage {
  constructor(private userRepository: UserRepository) {}
  async findById(id: string): Promise<IUser | undefined> {
    if (!uuidValidate(id)) {
      return;
    }
    const user = await this.userRepository.findOne({ id });
    return user && !user.isDeleted ? user : undefined;
  }

  async delete(id: string): Promise<boolean> {
    if (!uuidValidate(id)) {
      return false;
    }
    const user = await this.userRepository.findOne({ id });
    if (user && !user.isDeleted) {
      return (await this.userRepository.updateUser(id, { ...user!, isDeleted: true })) ? true : false;
    }
    return false;
  }

  async update(id: string, user: UserReq): Promise<IUser | undefined> {
    if (!uuidValidate(id)) {
      return;
    }
    const updatedUser = await this.userRepository.findOne({ id });
    if (!updatedUser) {
      return;
    }
    return await this.userRepository.updateUser(id, user);
  }

  async create(user: UserReq): Promise<IUser | undefined> {
    return await this.userRepository.createUser({ id: uuidv4(), ...user, isDeleted: false });
  }

  async getAutoSuggestList(loginSubstring: string, limit = "10"): Promise<IUser[]> {
    const result = await this.userRepository.find({ login: Like(`${loginSubstring}%`), isDeleted: false });
    return result ? (result.slice(0, +limit) as IUser[]).sort(sortUsers) : [];
  }

  async getUserByLogin(login: string): Promise<IUser | undefined> {
    const result = await this.userRepository.findOne({ login });
    return result;
  }

  async login(login: string, password: string): Promise<string | undefined> {
    const user = await this.userRepository.findOne({ login, password });
    return user ? jwt.sign({ login: user?.login, id: user.id }, "secretword") : undefined;
  }
}
