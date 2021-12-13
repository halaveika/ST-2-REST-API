import "reflect-metadata";
import dotenv from "dotenv";
import { createConnection } from "typeorm";
import { dbConfig } from "./config/dbconfig";
import { dbConfigDocker } from "./config/dbconfigDocker";
import App from "./app";
import { loggerError } from "./utils/loggerConfig";

dotenv.config();

createConnection(process.env.DOCKER_RUN === "true" ? dbConfigDocker : dbConfig)
  .then(async dbConnection => {
    console.log("DB was Connected");
    const app = new App(dbConnection);
    const PORT = process.env.PORT || process.env.BACKEND_PORT;
    app.server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    process
      .on("unhandledRejection", (reason: any, promise: Promise<any>): void => {
        loggerError.error("Unexpected exception occured", { reason, ex: promise });
        process.exit(1);
      })
      .on("uncaughtException", error => {
        loggerError.error(error.message);
        process.exit(1);
      });
  })
  .catch(error => loggerError.error(error.message));
