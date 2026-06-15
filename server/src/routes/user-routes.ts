import { Router } from "express";
import UserController from "../controllers/user-controller.js";

const userController = new UserController();

const router = Router();

router.post("/", userController.createTranspUser);
router.get("/me", userController.me);
router.get("/:idTransp/load-users", userController.loadTranspUser);
router.patch("/trocar-senha", userController.changePassword);
router.patch("/:idUser/trocar-senha", userController.resetPasswordByAdmin);
router.patch("/:idUser/cancel", userController.cancelUser);

export default router;
