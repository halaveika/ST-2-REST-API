import Faker from "faker";
import { define } from "typeorm-seeding";
import { User } from "../entity/user";
import { ageRandom } from "../../utils/ageRandom";

define(User, (faker: typeof Faker) => {
  const user = new User();
  user.login = faker.internet.userName() + Math.round(Math.random());
  user.password = faker.internet.password();
  user.age = ageRandom(18, 80);
  user.isDeleted = false;
  return user;
});
