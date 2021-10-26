import express, { Express } from "express";
import cors from "cors";
import { Connection } from "typeorm";
import authRouteLoader from "./loaders/authLoader";
import userRouteLoader from "./loaders/userRouteLoader";
import groupRouteLoader from "./loaders/groupRouteLoader";
import { errorHandler } from "./middleware/errorHandler";
import { serviceLogger } from "./middleware/logger";

class App {
  public server: Express = express();
  constructor(dbConnection: Connection) {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(serviceLogger);
    this.routeLoaders(dbConnection, this.server);
    this.server.use(errorHandler);
  }

  private routeLoaders(dbConnection: Connection, server: Express): void {
    authRouteLoader(dbConnection, server);
    userRouteLoader(dbConnection, server);
    groupRouteLoader(dbConnection, server);
  }
}

export default App;
