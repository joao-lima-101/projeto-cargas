import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

export default class AuthService {
  constructor(private prisma = new PrismaClient()) {}

  async login(login: string, senha: string) {
    const user = await this.prisma.usuario.findFirst({
      where: {
        email: login,
      },
    });

    if (!user) {
      throw new Error("Credenciais incorretas");
    }

    if (!user.ativo) {
      throw new Error("Usuário inativo");
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      throw new Error("Credenciais incorretas");
    }

    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
      throw new Error("JWT_SECRET não configurado");
    }

    const token = jwt.sign(
      {
        idUser: user.id_user,
        idTransp: user.id_transp,
        role: user.tipo_usuario,
      },
      secretKey,
      {
        expiresIn: "15m",
      },
    );

    return token;
  }
}
