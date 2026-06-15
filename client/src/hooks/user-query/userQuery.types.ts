export interface LoadUser {
  id_user: number;
  id_transp: number;
  email: string;
  tipo_usuario: string;
}

export interface LoadTranspUsers extends Omit<
  LoadUser,
  "id_transp" | "tipo_usuario"
> {
  ativo: boolean;
}

export interface CreateTranspUser {
  id_transp: number;
  email: string;
  senha: string;
}

export interface LoadTranspUsersProps {
  idTransp?: number;
  enabled: boolean;
}
