import { Request, Response, NextFunction } from "express";

export default function roleMiddleware(permittedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.idUser || !req.role)
      return res.status(401).json({ message: "Não autenticado" });

    if (!permittedRoles.includes(req.role))
      return res.status(403).json({ message: "Sem permissão" });

    return next();
  };
}
