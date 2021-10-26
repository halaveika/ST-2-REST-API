import { User } from "../db/entity/user";
import { EntityRepository, Repository } from "typeorm";
import { IUser } from "../models/userInterface";
import { UserReq } from "../models/userInterface";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async createUser(data: IUser): Promise<IUser | undefined> {
    return await this.save(data);
  }

  public async updateUser(id: string, data: UserReq | IUser): Promise<IUser | undefined> {
    const user = await this.findOne(id);
    return await this.save({ ...user!, ...data });
  }

  public async softDeletUser(id: string): Promise<boolean> {
    const user = await this.findOne(id);
    return (await this.save({ ...user!, isDeleted: true })) ? true : false;
  }
}
