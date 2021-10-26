import { Router, Express } from "express";
import validateMiddleware from "../middleware/validateMiddleware";
import userSchema from "../models/userShema";
import UserController from "../controllers/userController";
import { PostgresUserService } from "../services/postgresUserService";
import { UserRepository } from "../repositories/userRepository";
import { Connection } from "typeorm";
import { CheckUniqLogin } from "../middleware/checkUniqLogin";
import Auth from "../middleware/auth";

function userRouteLoader(connection: Connection, app: Express): void {
  const userRepository = connection.getCustomRepository(UserRepository);
  const storageService = new PostgresUserService(userRepository);
  const userController = new UserController(storageService);
  const checklogin = new CheckUniqLogin(storageService);
  const auth = new Auth();
  const userRoute = Router();

  userRoute
    .route("/")
    .post(
      auth.checkToken.bind(auth),
      validateMiddleware(userSchema),
      checklogin.check.bind(checklogin),
      userController.createUser.bind(userController)
    )
    .get(auth.checkToken.bind(auth), userController.getAutoSuggestList.bind(userController));
  userRoute
    .route("/:id")
    .get(auth.checkToken.bind(auth), userController.getUserById.bind(userController))
    .put(auth.checkToken.bind(auth), validateMiddleware(userSchema), userController.updateUserById.bind(userController))
    .delete(auth.checkToken.bind(auth), userController.deleteSoftUser.bind(userController));

  app.use("/api/users", userRoute);
}

export default userRouteLoader;
