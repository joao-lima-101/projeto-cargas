import { Router } from "express";
import TransportadoraController from "../controllers/carrier-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import roleMiddleware from "../middlewares/role-middleware.js";

const transportadoraController = new TransportadoraController();

const router = Router();

router.post("/", transportadoraController.create);
router.get("/:idTransp/load", authMiddleware, transportadoraController.load);
router.get(
  "/load-all",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  transportadoraController.loadAll,
);

export default router;
