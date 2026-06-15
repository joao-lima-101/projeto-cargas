export interface LoadTransp {
  id_transp: number;
  cnpj: string;
  razao_social: string;
  nome_fantasia: string | null;
  inscricao_estadual: string | null;
}

export interface LoadTransportadora {
  id_transp: number;
  cnpj: string;
  razao_social: string;
  nome_fantasia: string | null;
  inscricao_estadual: string | null;
  data_cadastro: string | Date;
}

export interface UseGetTransportadoraProps {
  idTransp?: number;
  enabled?: boolean;
}
