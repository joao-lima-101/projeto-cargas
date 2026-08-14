import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import useAuth from "../useAuth";
import api from "@/services/api";
import type { AxiosResponse } from "axios";
import type {
  LoadUser,
  LoadTranspUsers,
  LoadTranspUsersProps,
  CreateTranspUser,
} from "./userQuery.types";
import type { ChangeUserPasswordDTO } from "@/types/dialog";
import successMessage from "@/utils/notification/success";
import errorMessage from "@/utils/notification/error";

const fetchMe = async () => {
  const response: AxiosResponse<LoadUser> = await api.get("/usuario/me");
  return response.data;
};

export function useLoadMe() {
  const { loading } = useAuth();

  return useQuery<LoadUser>({
    queryKey: ["me"],
    queryFn: () => fetchMe(),
    enabled: !loading,
  });
}

const fetchUsers = async (idTransp: number) => {
  const response = await api.get<LoadTranspUsers[]>(
    `/usuario/${idTransp}/load-users`,
  );
  return response.data;
};

export function useLoadTranspUsers({
  idTransp,
  enabled,
}: LoadTranspUsersProps) {
  return useQuery({
    queryKey: ["usuarios_transportadora", idTransp],
    queryFn: () => fetchUsers(idTransp!),
    enabled: enabled && !!idTransp,
  });
}

export function useCreateTranspUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTranspUser) => {
      await api.post("/usuario", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios_transportadora"] });
      successMessage("Usuário criado com sucesso");
    },
    onError: (error: unknown) => {
      errorMessage(error);
    },
  });
}

export function useCancelUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (idUser: number) => {
      await api.patch(`/usuario/${idUser}/cancel`);
      console.log("mutation");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios_transportadora"] });
      successMessage("Usuário cancelado com sucesso");
    },
    onError: (error: unknown) => {
      errorMessage(error);
    },
  });
}

export function useChangeUserPass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      idUser,
      data,
    }: {
      idUser: number;
      data: ChangeUserPasswordDTO;
    }) => {
      await api.patch(`/usuario/${idUser}/trocar-senha`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios_transportadora"] });
      successMessage("Senha do usuário alterada com sucesso!");
    },
    onError: (error: unknown) => {
      errorMessage(error);
    },
  });
}
