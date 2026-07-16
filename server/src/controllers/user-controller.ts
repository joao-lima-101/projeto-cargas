import type { Request, Response } from "express";
import UserService from "../services/user/user-service.js";
import {
  createTranspUserSchema,
  changeUserPasswordSchema,
  changePasswordSchema,
} from "../validators/user-validation.js";

export default class UserController {
  constructor(private userService = new UserService()) {}

  me = async (req: Request, res: Response) => {
    const idUser = req.idUser;

    if (!idUser) throw new Error("Usuário não autorizado");

    const meData = await this.userService.me(idUser);

    return res.json(meData);
  };

  loadTranspUser = async (req: Request, res: Response) => {
    const idTransp = Number(req.params.idTransp);

    if (!idTransp) throw new Error("Credencial inválida");

    const usuarios = await this.userService.loadTranspUser(idTransp);

    return res.json(usuarios);
  };

  createTranspUser = async (req: Request, res: Response) => {
    const data = createTranspUserSchema.parse(req.body);

    await this.userService.createTranspUser(data);

    return res.status(201).json({ message: "Usuário criado com sucesso!" });
  };

  cancelUser = async (req: Request, res: Response) => {
    const idUser = Number(req.params.idUser);

    await this.userService.disableUser(idUser);

    return res.status(200).json({ message: "Usuário desativado com sucesso" });
  };

  resetPasswordByAdmin = async (req: Request, res: Response) => {
    const idUser = Number(req.params.idUser);
    const data = changeUserPasswordSchema.parse(req.body);
    const adminId = req.idUser;

    if (!adminId) throw new Error("Usuário não autorizado");

    await this.userService.resetPasswordByAdmin({
      idUser: idUser,
      novaSenha: data.novaSenha,
      confSenha: data.confSenha,
    });

    return res.status(200).json({
      message: "Senha do usuário resetada com sucesso",
    });
  };

  changePassword = async (req: Request, res: Response) => {
    const data = changePasswordSchema.parse(req.body);

    const idUser = req.idUser;

    if (!idUser) throw new Error("Usuário não autorizado");

    await this.userService.changePassword({
      idUser,
      ...data,
    });

    return res.status(200).json({
      message: "Senha alterada com sucesso",
    });
  };
}
