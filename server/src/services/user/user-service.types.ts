export interface ResetPasswordProps {
  idUser: number;
  novaSenha: string;
  confSenha: string;
}
export interface UserResponse {
  email: string;
  tipo_usuario: string;
}
export interface CreateUserTransp {
  id_transp: number;
  email: string;
  senha: string;
}
export interface ChangePasswordProps {
  idUser: number;
  senhaAtual: string;
  novaSenha: string;
  confSenha: string;
}
