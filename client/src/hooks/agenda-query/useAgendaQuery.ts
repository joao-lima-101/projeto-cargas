import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import useAuth from "../useAuth";
import errorMessage from "@/utils/notification/error";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import successMessage from "@/utils/notification/success";
import type {
  AgendamentoRequestDTO,
  LoadAgendamento,
} from "./agendaQuery.types";

const fetchAgenda = async (isAdmin: boolean) => {
  const endpoint = isAdmin ? "/agendamento/load-all" : "/agendamento/load";
  const response = await api.get<{ agendamento: LoadAgendamento[] }>(endpoint);

  const data = response.data.agendamento;

  return data.map((item) => ({
    ...item,
    data_agenda: new Date(item.data_agenda).toLocaleString("pt-BR"),
  }));
};

export function useLoadAgenda(isAdmin: boolean, isLoadedUser?: boolean) {
  const { loading } = useAuth();

  return useQuery<LoadAgendamento[]>({
    queryKey: ["agendamentos", isAdmin],
    queryFn: () => fetchAgenda(isAdmin),
    enabled: !loading && isLoadedUser,
  });
}

export function useCreateAgenda() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AgendamentoRequestDTO) =>
      await api.post("/agendamento", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agendamentos"] });
      successMessage("Agendamento criado com sucesso");
    },
    onError: (error: unknown) => {
      errorMessage(error);
    },
  });
}

export function useCancelAgenda() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id_agenda: number) => {
      const response = await api.patch(`/agendamento/${id_agenda}/cancel`);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agendamentos"] });
      successMessage("Agendamento cancelado com sucesso!");
    },
    onError: (error: unknown) => {
      errorMessage(error);
    },
  });
}
