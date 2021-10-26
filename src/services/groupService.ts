import { IGroup } from "../models/groupInterface";

export interface GroupStorage {
  getById: (id: string) => IGroup | undefined | Promise<IGroup | undefined>;
  delete: (id: string) => boolean | Promise<boolean>;
  update: (id: string, groupData: Omit<IGroup, "id">) => IGroup | undefined | Promise<IGroup | undefined>;
  create: (groupData: Omit<IGroup, "id">) => IGroup | Promise<IGroup>;
  getAll: () => IGroup[] | Promise<IGroup[]>;
  addUsersToGroup: (idGroup: string, idUsers: string[]) => IGroup | undefined | Promise<IGroup | undefined>;
}
