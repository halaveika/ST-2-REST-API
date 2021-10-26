import Faker from "faker";
import { define } from "typeorm-seeding";
import { Group } from "../entity/group";

define(Group, (faker: typeof Faker) => {
  const typeArr = ["READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"];
  const group = new Group();
  group.name = faker.lorem.word();
  group.permissions = [faker.random.objectElement(typeArr)];
  return group;
});
