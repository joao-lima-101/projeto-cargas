import TransportadoraService from "../services/carrier/carrier-service.js";
import type { Request, Response } from "express";
import { registerSchema } from "../validators/carrier-validation.js";

export default class TransportadoraController {
  constructor(private transportadoraService = new TransportadoraService()) {}

  create = async (req: Request, res: Response) => {
    const data = registerSchema.parse(req.body);

    const newTransp = await this.transportadoraService.create(data);

    return res.status(201).json({
      message: "Transportadora cadastrada com sucesso!",
      transportadora: newTransp,
    });
  };

  load = async (req: Request, res: Response) => {
    const idTransp = Number(req.params.idTransp);

    if (!idTransp) throw new Error("Credencial inválida");

    const transportadora = await this.transportadoraService.load(idTransp);

    return res.status(200).json(transportadora);
  };

  loadAll = async (_req: Request, res: Response) => {
    const transportadoras = await this.transportadoraService.loadAll();

    return res.status(200).json(transportadoras);
  };
}
