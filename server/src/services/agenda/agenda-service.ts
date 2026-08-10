import { PrismaClient } from "@prisma/client";
import { AgendamentoCreate } from "./agenda-service.types.js";

export default class AgendamentoService {
  constructor(private prisma = new PrismaClient()) {}

  create = async (agendamentoData: AgendamentoCreate) => {
    const { data_agenda, ...data } = agendamentoData;

    return await this.prisma.agendamento.create({
      data: { data_agenda: new Date(data_agenda), ...data },
    });
  };

  load = async (idUser: number) => {
    const user = await this.prisma.agendamento.findMany({
      where: { id_user: idUser },
      select: {
        id_agenda: true,
        data_agenda: true,
        tipo: true,
        status: true,
        observacoes: true,
      },
    });

    return user;
  };

  loadAll = async () => {
    const user = await this.prisma.agendamento.findMany({
      select: {
        id_agenda: true,
        data_agenda: true,
        tipo: true,
        status: true,
        observacoes: true,
      },
    });

    console.log("testandoo", user);

    return user;
  };

  cancel = async (idAgenda: number) => {
    return await this.prisma.agendamento.update({
      where: { id_agenda: idAgenda },
      data: { status: "CANCELADO" },
    });
  };
}
