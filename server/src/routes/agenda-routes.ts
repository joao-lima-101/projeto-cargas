import { Router } from "express";
import AgendamentoController from "../controllers/agenda-controller.js";

const agendamentoController = new AgendamentoController();

const router = Router();

router.post("/", agendamentoController.createAgendamento);
router.get("/load", agendamentoController.loadAgendamento);
router.patch("/:idAgenda/cancel", agendamentoController.cancelAgendamento);

export default router;
