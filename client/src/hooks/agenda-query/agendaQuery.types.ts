export interface LoadAgendamento {
  id_agenda: number;
  data_agenda: string;
  status: "PENDENTE" | "CONFIRMADO" | "CANCELADO" | "CONCLUIDO";
  tipo: "COLETA" | "ENTREGA" | "DEVOLUCAO";
  observacoes?: string;
  usuario: {
    id_user: number;
    email: string;
  };
}

export interface AgendamentoRequestDTO {
  data_agenda: string;
  tipo: string;
  observacoes?: string;
}
