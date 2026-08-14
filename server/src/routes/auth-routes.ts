import { Router } from "express";
import AuthController from "../controllers/auth-controller.js";

const authController = new AuthController();

const router = Router();

router.post("/login", authController.login);
router.post("/logout", authController.logout);

export default router;
