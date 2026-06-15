import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import {
  ChangePasswordProps,
  ResetPasswordProps,
  CreateUserTransp,
  UserResponse,
} from "./user-service.types.js";

export default class UserService {
  static #SALT_ROUNDS = 12;

  constructor(private prisma = new PrismaClient()) {}

  async createTranspUser(userData: CreateUserTransp): Promise<UserResponse> {
    const users = await this.prisma.usuario.findMany({
      where: { id_transp: userData.id_transp },
      select: { email: true },
    });

    const emailExists = users.some(
      (user) => user.email.toLowerCase() === userData.email.toLowerCase(),
    );

    if (emailExists)
      throw new Error("E-mail já cadastrado nessa transportadora");

    const senhaHash = await bcrypt.hash(
      userData.senha,
      UserService.#SALT_ROUNDS,
    );

    return this.prisma.usuario.create({
      data: {
        id_transp: userData.id_transp,
        email: userData.email,
        senha: senhaHash,
        tipo_usuario: "USER",
      },
      select: { email: true, tipo_usuario: true },
    });
  }

  async me(idUser: number) {
    const user = await this.prisma.usuario.findFirst({
      where: { id_user: idUser },
      select: {
        id_user: true,
        id_transp: true,
        email: true,
        tipo_usuario: true,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }

  async loadTranspUser(idTransp: number) {
    const users = await this.prisma.usuario.findMany({
      where: { id_transp: idTransp },
      select: { id_user: true, email: true, ativo: true },
    });

    return users;
  }

  async disableUser(idUser: number) {
    return this.prisma.usuario.update({
      where: { id_user: idUser },
      data: { ativo: false },
      select: { id_user: true },
    });
  }

  async resetPasswordByAdmin(resetPasswordProps: ResetPasswordProps) {
    const { idUser, novaSenha } = resetPasswordProps;

    const user = await this.prisma.usuario.findUnique({
      where: { id_user: idUser },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const senhaHash = await bcrypt.hash(novaSenha, UserService.#SALT_ROUNDS);

    return this.prisma.usuario.update({
      where: { id_user: idUser },
      data: { senha: senhaHash },
      select: { id_user: true, email: true },
    });
  }

  async changePassword(changePasswordProps: ChangePasswordProps) {
    const { senhaAtual, novaSenha, confSenha, idUser } = changePasswordProps;

    if (novaSenha !== confSenha) {
      throw new Error("Senhas não estão iguais");
    }

    const user = await this.prisma.usuario.findUnique({
      where: { id_user: idUser },
    });

    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    const matchSenha = await bcrypt.compare(senhaAtual, user.senha);

    if (!matchSenha) {
      throw new Error("Senha atual incorreta");
    }

    const senhaHash = await bcrypt.hash(novaSenha, UserService.#SALT_ROUNDS);

    return this.prisma.usuario.update({
      where: { id_user: idUser },
      data: { senha: senhaHash },
      select: { id_user: true, email: true },
    });
  }
}
