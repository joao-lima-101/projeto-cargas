import { PrismaClient } from "@prisma/client";
import type { TransportadoraCreate } from "./carrier-service.types.js";

export default class TransportadoraService {
  constructor(private prisma = new PrismaClient()) {}

  async load(idTransp: number) {
    const transportadora = await this.prisma.transportadora.findFirst({
      where: { id_transp: idTransp },
    });

    return transportadora;
  }

  async loadAll() {
    const transportadoras = await this.prisma.transportadora.findMany({
      select: {
        id_transp: true,
        cnpj: true,
        razao_social: true,
        nome_fantasia: true,
        inscricao_estadual: true,
        data_cadastro: true,
      },
    });

    return transportadoras;
  }

  async create(transpDTO: TransportadoraCreate) {
    const transpExists =
      (await this.prisma.transportadora.count({
        where: { cnpj: transpDTO.transportadoraDTO.cnpj },
      })) > 0;

    if (transpExists) {
      throw new Error("CNPJ já cadastrado");
    }

    return await this.prisma.$transaction(async (tx) => {
      const saveTransp = await tx.transportadora.create({
        data: transpDTO.transportadoraDTO,
        select: { id_transp: true },
      });

      await tx.contato.create({
        data: { id_transp: saveTransp.id_transp, ...transpDTO.contatoDTO },
      });

      await tx.endereco.create({
        data: { id_transp: saveTransp.id_transp, ...transpDTO.enderecoDTO },
      });
    });
  }
}
