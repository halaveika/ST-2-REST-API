import { ConnectionOptions } from "typeorm";
import dotenv from "dotenv";
import { Group } from "../db/entity/group";
import { User } from "../db/entity/user";

dotenv.config();

export const dbConfig: ConnectionOptions = {
  type: "postgres",
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: true,
  migrationsRun: true,
  logging: false,
  entities: [User, Group],
  extra: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};
