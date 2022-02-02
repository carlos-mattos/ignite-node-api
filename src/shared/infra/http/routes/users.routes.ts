import { Router } from "express";
import multer from "multer";
import CreateUserController from "@modules/accounts/useCases/createUser/CreateUserController";
import UpdateUserAvatarController from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";
import uploadConfig from "@config/upload";
import ensureAdmin from "../middlewares/ensureAdmin";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createUserController.handle
);
usersRoutes.patch(
  "/avatar",
  uploadAvatar.single("avatar"),
  ensureAuthenticated,
  updateUserAvatarController.handle
);

export default usersRoutes;
