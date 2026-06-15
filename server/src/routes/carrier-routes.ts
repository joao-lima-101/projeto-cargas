import { Router } from "express";
import TransportadoraController from "../controllers/carrier-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const transportadoraController = new TransportadoraController();

const router = Router();

router.post("/", transportadoraController.create);
router.get("/:idTransp/load", authMiddleware, transportadoraController.load);
router.get("/load-all", authMiddleware, transportadoraController.loadAll);

export default router;
