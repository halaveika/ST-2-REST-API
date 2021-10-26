import { Express } from "express";
// import { InMemoryUserService } from "../services/in-memory-user.service";
import { PostgresUserService } from "../services/postgresUserService";
import { UserRepository } from "../repositories/userRepository";
import { Connection } from "typeorm";
import Auth from "../middleware/auth";

function authRouteLoader(connection: Connection, app: Express): void {
  // const storageService = new InMemoryUserService();  // sync data service
  const userRepository = connection.getCustomRepository(UserRepository);
  const storageService = new PostgresUserService(userRepository);
  const auth = new Auth(storageService);
  app.post("/login", auth.login.bind(auth));
}

export default authRouteLoader;
