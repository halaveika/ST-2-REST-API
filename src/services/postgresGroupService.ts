import { IGroup } from "../models/groupInterface";
import { GroupStorage } from "./groupService";
import { v4 as uuidv4 } from "uuid";
import { Group } from "../db/entity/group";
import { User } from "../db/entity/user";
import { Repository, getManager, In, getRepository } from "typeorm";

export default class PostgresGroupService implements GroupStorage {
  constructor(private groupRepository: Repository<Group>) {}

  async getById(id: string): Promise<IGroup | undefined> {
    return await this.groupRepository.findOne({ id });
  }

  async delete(id: string): Promise<boolean> {
    return (await this.groupRepository.delete({ id })).affected ? true : false;
  }

  async create(groupData: Omit<IGroup, "id">): Promise<IGroup> {
    return await this.groupRepository.save({ id: uuidv4(), ...groupData });
  }

  async update(id: string, groupData: Omit<IGroup, "id">): Promise<IGroup | undefined> {
    const updatedUser = await this.groupRepository.findOne({ id });
    if (!updatedUser) {
      return;
    }
    return await this.groupRepository.save({ id, ...groupData });
  }

  async getAll(): Promise<IGroup[]> {
    return await this.groupRepository.find({});
  }

  async addUsersToGroup(idGroup: string, idUsers: string[]): Promise<Group | undefined> {
    const userRepository = getRepository(User);
    const group = await this.groupRepository.findOne({ id: idGroup });
    group!.users = await userRepository.find({ where: { id: In(idUsers) } });
    return getManager().transaction("SERIALIZABLE", async transactionalEntityManager => {
      return await transactionalEntityManager.save(group);
    });
  }
}
