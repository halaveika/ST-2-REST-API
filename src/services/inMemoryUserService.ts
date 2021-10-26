import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "../models/userInterface";
import { UserReq } from "../models/userInterface";
import { UserStorage } from "./userService";
import { sortUsers } from "../utils/sortUsers";

export default class InMemoryUserService implements UserStorage {
  private users: IUser[] = [
    {
      id: "38cdc7e4-0369-4b91-9370-032b1370c635",
      login: "Alex123",
      password: "43fhaf5",
      age: 46,
      isDeleted: false,
    },
    {
      id: uuidv4(),
      login: "Boba23",
      password: "43ad523af5",
      age: 22,
      isDeleted: false,
    },
    {
      id: "c77b646a-7696-4ea9-aeea-bcbdb13a45f1",
      login: "Alexander13",
      password: "43adaffhdaf5",
      age: 44,
      isDeleted: false,
    },
  ];

  findById(id: string): IUser | undefined {
    return this.users.find(user => user.id === id && user.isDeleted === false);
  }

  delete(id: string): boolean {
    const index = this.users.findIndex(user => user.id === id && user.isDeleted === false);
    if (index === -1) {
      return false;
    }
    this.users[index].isDeleted = true;
    return true;
  }

  update(id: string, user: UserReq): IUser | undefined {
    const index = this.users.findIndex(user => user.id === id && user.isDeleted === false);
    let updatedUser;
    if (index !== -1) {
      updatedUser = { ...this.users[index], ...user };
      this.users.splice(index, 1, updatedUser);
    }
    return updatedUser;
  }

  create(user: UserReq): IUser {
    const newUser: IUser = { id: uuidv4(), ...user, isDeleted: false };
    this.users.push(newUser);
    return newUser;
  }

  getAutoSuggestList(loginSubstring: string, limit: string): IUser[] {
    const result = this.users.filter(user => user.login.includes(loginSubstring) && user.isDeleted === false);
    if (result.length) {
      return result.sort(sortUsers).slice(0, +limit);
    }
    return result;
  }

  getUserByLogin(login: string): IUser | undefined {
    return this.users.find(user => user.login === login);
  }

  login(login: string, password: string): string | undefined {
    const user = this.users.find(user => user.login === login && user.password === password);
    return user ? jwt.sign({ login: user?.login, id: user.id }, "secretword") : undefined;
  }
}
