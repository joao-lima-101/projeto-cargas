import {
  Dialog,
  Portal,
  Button,
  Input,
  Field,
  SimpleGrid,
  GridItem,
  InputGroup,
} from "@chakra-ui/react";
import { LuMail } from "react-icons/lu";
import { InputSenha } from "@/components/ui/PasswordInput";
import { useCreateTranspUser } from "@/hooks/user-query/useUserQuery";
import type { TranspDialogProps } from "@/types/dialog";
import { useForm } from "react-hook-form";
import type { CreateTranspUser } from "@/hooks/user-query/userQuery.types";

interface TranspUserForm {
  email: string;
  senha: string;
  confSenha: string;
}

export default function CreateUserDialog({
  open,
  onOpenChange,
  idTransp,
}: TranspDialogProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TranspUserForm>({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { mutate: createUser, isPending } = useCreateTranspUser();

  const onSubmit = (data: TranspUserForm) => {
    const { confSenha, ...user } = data;
    const payload: CreateTranspUser = { ...user, id_transp: idTransp };
    createUser(payload, {
      onSuccess: () => {
        reset();
        onOpenChange({ open: false });
      },
    });
  };

  const senha = watch("senha");

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} size="md">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Dialog.Header
                bg="bg.muted"
                py={4}
                px={6}
                borderBottomWidth="1px"
                borderColor="border.muted"
              >
                <Dialog.Title>Cadastrar usuário</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
                  <GridItem colSpan={2}>
                    <Field.Root invalid={!!errors.email} required>
                      <Field.Label>E-mail</Field.Label>
                      <InputGroup startElement={<LuMail />}>
                        <Input
                          type="email"
                          placeholder="E-mail"
                          {...register("email", {
                            required: "E-mail é obrigatório",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Formato de email inválido",
                            },
                          })}
                        />
                      </InputGroup>
                      <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                    </Field.Root>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Field.Root invalid={!!errors.senha} required>
                      <Field.Label>Senha</Field.Label>
                      <InputSenha
                        placeholder="Senha"
                        {...register("senha", {
                          required: "Senha é obrigatória",
                          minLength: {
                            value: 8,
                            message: "Senha deve ter 8 digitos ou mais",
                          },
                        })}
                      />
                      <Field.ErrorText>{errors.senha?.message}</Field.ErrorText>
                    </Field.Root>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Field.Root invalid={!!errors.confSenha} required>
                      <Field.Label>Confirmar senha</Field.Label>
                      <InputSenha
                        placeholder="Confirmar senha"
                        {...register("confSenha", {
                          required: "Confirmação de senha é obrigatória",
                          validate: (value) =>
                            senha === value || "Senhas não coincidem",
                        })}
                      />
                      <Field.ErrorText>
                        {errors.confSenha?.message}
                      </Field.ErrorText>
                    </Field.Root>
                  </GridItem>
                </SimpleGrid>
              </Dialog.Body>

              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button colorPalette="red">Cancelar</Button>
                </Dialog.ActionTrigger>
                <Button type="submit" colorPalette="green" loading={isPending}>
                  Cadastrar
                </Button>
              </Dialog.Footer>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
