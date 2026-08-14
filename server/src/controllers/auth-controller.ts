import type { Request, Response } from "express";
import AuthService from "../services/auth/auth-service.js";

export default class AuthController {
  constructor(private authService = new AuthService()) {}

  login = async (req: Request, res: Response) => {
    try {
      const { login, senha } = req.body;

      if (!login || !senha) {
        return res.status(400).json({ message: "Credenciais incompletas" });
      }

      const loginToken = await this.authService.login(login, senha);

      res.cookie("token", loginToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });

      return res.status(200).json({ message: "Login realizado com sucesso!" });
    } catch (error: any) {
      return res
        .status(401)
        .json({ message: error.message || "Erro ao realizar login" });
    }
  };

  logout = async (_req: Request, res: Response) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout realizado com sucesso" });
  };
}
