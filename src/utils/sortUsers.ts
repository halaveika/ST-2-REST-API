import { IUser } from "../models/userInterface";

export function sortUsers(a: IUser, b: IUser): number {
  if (a.login > b.login) {
    return 1;
  } else if (a.login < b.login) {
    return -1;
  }
  return 0;
}
