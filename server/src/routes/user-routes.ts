import { Router } from "express";
import UserController from "../controllers/user-controller.js";
import roleMiddleware from "../middlewares/role-middleware.js";

const userController = new UserController();

const router = Router();

router.post("/", userController.createTranspUser);

router.get("/me", userController.me);

router.patch("/trocar-senha", userController.changePassword);

router.get(
  "/:idTransp/load-users",
  roleMiddleware(["ADMIN"]),
  userController.loadTranspUser,
);

router.patch(
  "/:idUser/trocar-senha",
  roleMiddleware(["ADMIN"]),
  userController.resetPasswordByAdmin,
);

router.patch(
  "/:idUser/cancel",
  roleMiddleware(["ADMIN"]),
  userController.cancelUser,
);

export default router;
