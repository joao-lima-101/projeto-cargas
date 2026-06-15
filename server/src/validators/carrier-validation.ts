import z from "zod";

export const registerSchema = z.object({
  transportadoraDTO: z.object({
    cnpj: z.string().min(14, "CNPJ inválido"),
    razao_social: z.string().min(1, "Razao social é obrigatória"),
    nome_fantasia: z.string().optional(),
    inscricao_estadual: z.string().optional(),
  }),
  contatoDTO: z.object({
    email: z.email("E-mail inválido"),
    telefone: z.string().optional(),
  }),
  enderecoDTO: z.object({
    cep: z.string().min(1, "CEP obrigatório"),
    bairro: z.string().min(1, "Endereço é obrigatório"),
    numero: z.string().optional(),
    complemento: z.string().optional(),
    cidade: z.string().min(1, "Cidade obrigatória"),
    estado: z.string().min(1, "Estado obrigatório"),
  }),
});
