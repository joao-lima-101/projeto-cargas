import { Router } from "express";
import AgendamentoController from "../controllers/agenda-controller.js";
import roleMiddleware from "../middlewares/role-middleware.js";

const agendamentoController = new AgendamentoController();

const router = Router();

router.post("/", agendamentoController.createAgendamento);
router.get("/load", agendamentoController.loadAgendamento);
router.get(
  "/load-all",
  roleMiddleware(["ADMIN"]),
  agendamentoController.loadAllAgendamento,
);
router.patch("/:idAgenda/cancel", agendamentoController.cancelAgendamento);

export default router;
