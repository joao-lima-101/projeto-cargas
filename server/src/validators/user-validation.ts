import z from "zod";

export const createTranspUserSchema = z.object({
  id_transp: z.number(),
  email: z.email("Email invalido"),
  senha: z.string().min(8, "Senha inválida"),
});

export const changeUserPasswordSchema = z
  .object({
    novaSenha: z.string().min(8, "A senha deve ter no minimo 8 caracteres"),
    confSenha: z.string(),
  })
  .refine((data) => data.novaSenha === data.confSenha, {
    error: "As senhas não coincidem",
    path: ["confSenha"],
  });

export const changePasswordSchema = z
  .object({
    senhaAtual: z.string(),
    novaSenha: z.string().min(8, "Senha deve ter mais de 8 digitos"),
    confSenha: z.string(),
  })
  .refine((data) => data.novaSenha === data.confSenha, {
    error: "Senhas não coincidem",
    path: ["confSenha"],
  });
