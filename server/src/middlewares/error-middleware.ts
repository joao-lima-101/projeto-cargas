import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import z from "zod";

export function errorMiddleware(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(err);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const DUPLICATE_KEY_MAP: Record<string, string> = {
      email: "Email já cadastrado",
      cnpj: "Cnpj já cadastrado",
    };
    switch (err.code) {
      case "P2002":
        const target = (err.meta?.target as string[]) || [];
        const field = target.find((f) => DUPLICATE_KEY_MAP[f]);
        const message = field ? DUPLICATE_KEY_MAP[field] : "Registro já existe";

        throw new Error(message);

      case "P2025":
        throw new Error("Registro não encontrado");
      case "P2003":
        throw new Error(
          "Erro de integridade: Registro dependente não encontrado",
        );
      default:
        throw new Error(`Erro no banco de dados: ${err.code}`);
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    throw new Error("Dados invalidos enviados ao servidor");
  }

  if (err instanceof z.ZodError) {
    return res.status(400).json({
      message: "Erro de validação",
      errors: z.treeifyError(err),
    });
  }

  const status = err.status || 500;
  return res.status(status).json({
    message: err.message || "Erro interno no servidor",
  });
}
