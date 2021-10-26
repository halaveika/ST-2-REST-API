import { v4 as uuidv4 } from "uuid";
import { IGroup } from "../models/groupInterface";
import { GroupStorage } from "./groupService";

export default class InMemoryGroupService implements GroupStorage {
  private groups: IGroup[] = [
    {
      id: "2e1afe61-4eab-47dc-bb64-431b88ab46c8",
      name: "admins",
      permissions: ["READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"],
    },
    { id: "3d40db2d-4670-4034-a505-9d3d0c8fff9b", name: "superusers", permissions: ["READ", "WRITE", "DELETE"] },
    { id: "fda96534-4d31-44af-98a5-4719df6d94a3", name: "superstudents", permissions: ["READ"] },
  ];

  private user_group = [
    { groups_id: "fda96534-4d31-44af-98a5-4719df6d94a3", users_id: "38cdc7e4-0369-4b91-9370-032b1370c635" },
  ];

  getById(id: string): IGroup | undefined {
    return this.groups.find(group => group.id === id);
  }

  delete(id: string): boolean {
    const index = this.groups.findIndex(group => group.id === id);
    if (index === -1) {
      return false;
    }
    this.groups.splice(index, 1);
    return true;
  }

  create(groupData: Omit<IGroup, "id">): IGroup {
    const newGroup: IGroup = { id: uuidv4(), ...groupData };
    this.groups.push(newGroup);
    return newGroup;
  }

  update(id: string, groupData: Omit<IGroup, "id">): IGroup | undefined {
    const index = this.groups.findIndex(group => group.id === id);
    let updatedGroup;
    if (index !== -1) {
      updatedGroup = { ...this.groups[index], ...groupData };
      this.groups.splice(index, 1, updatedGroup);
    }
    return updatedGroup;
  }

  getAll(): IGroup[] {
    return this.groups;
  }

  addUsersToGroup(idGroup: string, idUsers: string[]): IGroup | undefined {
    const arrLength = this.user_group.length;
    idUsers.forEach(element => this.user_group.push({ groups_id: idGroup, users_id: element }));
    return arrLength !== this.user_group.length ? this.getById(idGroup) : undefined;
  }
}
