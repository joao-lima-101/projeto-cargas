import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";
import api from "@/services/api";
import errorMessage from "@/utils/notification/error";
import successMessage from "@/utils/notification/success";
import { useMutation } from "@tanstack/react-query";
import type { FormCadastroData } from "@/components/form/RegisterForm";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { AxiosResponse } from "axios";
import type {
  LoadTransp,
  LoadTransportadora,
  UseGetTransportadoraProps,
} from "./transpQuery.types";

const loadTransp = async () => {
  const response: AxiosResponse<LoadTransp[]> = await api.get(
    "/transportadora/load-all",
  );

  return response.data;
};

export function useLoadTransp() {
  const { token, loading } = useAuth();

  return useQuery<LoadTransp[]>({
    queryKey: ["transportadoras", token],
    queryFn: () => loadTransp(),
    enabled: !!token && !loading,
  });
}

const fetchTransportadora = async (idTransp: number) => {
  const response = await api.get<LoadTransportadora>(
    `/transportadora/${idTransp}/load`,
  );
  return response.data;
};

export const useGetTransp = ({
  idTransp,
  enabled,
}: UseGetTransportadoraProps) => {
  return useQuery({
    queryKey: ["transportadora", idTransp],
    queryFn: () => {
      if (!idTransp) throw new Error("ID da transportadora não fornecido");
      return fetchTransportadora(idTransp);
    },
    enabled: enabled && !!idTransp,
  });
};

const createTransportadora = async (data: FormCadastroData) => {
  const response = await axios.post<{ message: string }>(
    `${import.meta.env.VITE_API_URL}/transportadora`,
    data,
  );
  return response.data;
};

export const useCreateTransp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransportadora,
    onSuccess: (data) => {
      successMessage(data.message);
      queryClient.invalidateQueries({ queryKey: ["transportadoras"] });
    },
    onError: (error) => {
      errorMessage(error);
    },
  });
};
