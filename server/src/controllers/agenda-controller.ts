import type { Request, Response } from "express";
import AgendamentoService from "../services/agenda/agenda-service.js";
import { agendamentoSchema } from "../validators/agenda-validation.js";

export default class AgendamentoController {
  constructor(private agendamentoService = new AgendamentoService()) {}

  createAgendamento = async (req: Request, res: Response) => {
    const idUser = req.idUser;

    if (!idUser) throw new Error("Usuário não autorizado");

    const data = agendamentoSchema.parse(req.body);

    await this.agendamentoService.create({ id_user: idUser, ...data });

    return res.status(201).json({ message: "Agendamento criado com sucesso" });
  };

  loadAgendamento = async (req: Request, res: Response) => {
    const idUser = req.idUser;

    if (!idUser) throw new Error("Usuário não autorizado");

    const response = await this.agendamentoService.load(idUser);

    return res.status(200).json({ agendamento: response });
  };

  loadAllAgendamento = async (_req: Request, res: Response) => {
    const response = await this.agendamentoService.loadAll();
    return res.status(200).json({ agendamento: response });
  };

  cancelAgendamento = async (req: Request, res: Response) => {
    const idAgenda = Number(req.params.idAgenda);

    if (!idAgenda) throw new Error("Credencial inválida");

    await this.agendamentoService.cancel(idAgenda);

    return res
      .status(200)
      .json({ message: "Agendamento cancelado com sucesso" });
  };
}
