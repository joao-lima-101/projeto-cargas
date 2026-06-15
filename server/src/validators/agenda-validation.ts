import z from "zod";

export const agendamentoSchema = z.object({
  data_agenda: z.string().min(1, "Data é obrigatória"),
  tipo: z.enum(["COLETA", "ENTREGA", "DEVOLUCAO"]),
  observacoes: z.string().nullable(),
});
