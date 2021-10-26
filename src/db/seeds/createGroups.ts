import { Factory, Seeder } from "typeorm-seeding";
import { Group } from "../entity/group";

export default class CreateGroups implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Group)().createMany(4);
  }
}
