import { Router, Express } from "express";
import validateMiddleware from "../middleware/validateMiddleware";
import groupShema from "../models/groupShema";
import GroupController from "../controllers/groupController";
import PostgresGroupService from "../services/postgresGroupService";
import { Connection } from "typeorm";
import { Group } from "../db/entity/group";
import Auth from "../middleware/auth";

function groupRouteLoader(connection: Connection, app: Express): void {
  const groupRepository = connection.getRepository(Group);
  const storageService = new PostgresGroupService(groupRepository);
  const groupController = new GroupController(storageService);
  const auth = new Auth();
  const groupRoute = Router();

  groupRoute
    .route("/")
    .post(auth.checkToken.bind(auth), validateMiddleware(groupShema), groupController.createGroup.bind(groupController))
    .put(auth.checkToken.bind(auth), groupController.addUsersToGroup.bind(groupController))
    .get(auth.checkToken.bind(auth), groupController.getAll.bind(groupController));
  groupRoute
    .route("/:id")
    .get(auth.checkToken.bind(auth), groupController.getGroupById.bind(groupController))
    .put(
      auth.checkToken.bind(auth),
      validateMiddleware(groupShema),
      groupController.updateGroupById.bind(groupController)
    )
    .delete(auth.checkToken.bind(auth), groupController.deleteGroup.bind(groupController));

  app.use("/api/groups", groupRoute);
}

export default groupRouteLoader;
