import { IUser } from "../models/userInterface";
import { UserReq } from "../models/userInterface";

export interface UserStorage {
  findById: (id: string) => IUser | undefined | Promise<IUser | undefined>;
  delete: (id: string) => boolean | Promise<boolean>;
  update: (id: string, user: UserReq) => IUser | undefined | Promise<IUser | undefined>;
  create: (user: UserReq) => IUser | Promise<IUser | undefined>;
  getAutoSuggestList: (loginSubstring: string, limit: string) => IUser[] | Promise<IUser[]>;
  getUserByLogin: (login: string) => IUser | undefined | Promise<IUser | undefined>;
  login: (login: string, password: string) => string | undefined | Promise<string | undefined>;
}
