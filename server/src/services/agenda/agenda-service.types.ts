export interface AgendamentoCreate {
  id_user: number;
  data_agenda: string | Date;
  tipo: "COLETA" | "ENTREGA" | "DEVOLUCAO";
  observacoes: string | null;
}
