import type { Request, Response } from "express";
import AuthService from "../services/auth/auth-service.js";

export default class AuthController {
  constructor(private authService = new AuthService()) {}

  login = async (req: Request, res: Response) => {
    const { login, senha } = req.body;

    if (!login || !senha) {
      return res.status(400).json({ message: "Credenciais incompletas" });
    }

    const loginToken = await this.authService.login(login, senha);

    return res.status(200).json({ token: loginToken });
  };
}
