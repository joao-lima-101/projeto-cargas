import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    console.error("SECRET KEY não configurada");
    return res.status(500).json({ message: "Erro interno de configuração" });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as {
      idUser: number;
      idTransp: number;
      role: string;
    };

    req.idUser = decoded.idUser;
    req.idTransp = decoded.idTransp;
    req.role = decoded.role;

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}
