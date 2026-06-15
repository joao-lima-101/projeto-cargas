export interface TransportadoraCreate {
  transportadoraDTO: {
    cnpj: string;
    razao_social: string;
    nome_fantasia?: string;
    inscricao_estadual?: string;
  };
  contatoDTO: {
    email: string;
    telefone?: string;
  };
  enderecoDTO: {
    cep: string;
    bairro: string;
    numero?: string;
    complemento?: string;
    cidade: string;
    estado: string;
  };
}
