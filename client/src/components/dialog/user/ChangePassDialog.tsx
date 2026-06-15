import { Dialog, Portal, VStack, Field, Button } from "@chakra-ui/react";
import { LuX } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { InputSenha } from "@/components/ui/PasswordInput";
import useAuth from "@/hooks/useAuth";
import api from "@/services/api";
import errorMessage from "@/utils/notification/error";
import successMessage from "@/utils/notification/success";
import type { DialogProps } from "@/types/dialog";

interface TrocarSenhaDTO {
  senhaAtual: string;
  novaSenha: string;
  confSenha: string;
}

export default function ChangePasswordDialog({
  open,
  onOpenChange,
}: DialogProps) {
  const { logout } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TrocarSenhaDTO>({ mode: "onChange", reValidateMode: "onChange" });

  const senha = watch("novaSenha");

  const onSubmit = async (data: TrocarSenhaDTO) => {
    try {
      const response = await api.patch("/usuario/trocar-senha", data);

      if (response.status === 200) {
        successMessage(
          response.data.message,
          "Faça login novamente para continuar",
        );
        reset();
        logout();
      }
    } catch (error: unknown) {
      errorMessage(error);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} size="md">
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(4px)" />
        <Dialog.Positioner>
          <Dialog.Content>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Dialog.Header>
                <Dialog.Title>Trocar senha</Dialog.Title>
                <Dialog.CloseTrigger />
              </Dialog.Header>

              <Dialog.Body>
                <VStack gap={4} align="stretch">
                  <Field.Root invalid={!!errors.senhaAtual}>
                    <Field.Label>Senha atual</Field.Label>
                    <InputSenha
                      disabled={isSubmitting}
                      {...register("senhaAtual", {
                        required: "Insira a senha atual",
                      })}
                    />
                    <Field.ErrorText>
                      {errors.senhaAtual?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.novaSenha}>
                    <Field.Label>Nova senha</Field.Label>
                    <InputSenha
                      disabled={isSubmitting}
                      {...register("novaSenha", {
                        required: "Insira a nova senha",
                        minLength: {
                          value: 6,
                          message: "A senha deve ter no mínimo 6 caracteres",
                        },
                      })}
                    />
                    <Field.ErrorText>
                      {errors.novaSenha?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.confSenha}>
                    <Field.Label>Confirmar senha</Field.Label>
                    <InputSenha
                      disabled={isSubmitting}
                      {...register("confSenha", {
                        required: "Confirme a nova senha",
                        validate: (value) =>
                          value === senha || "Senhas não coincidem",
                      })}
                    />
                    <Field.ErrorText>
                      {errors.confSenha?.message}
                    </Field.ErrorText>
                  </Field.Root>
                </VStack>
              </Dialog.Body>

              <Dialog.Footer mt={2}>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline" disabled={isSubmitting}>
                    Cancelar
                  </Button>
                </Dialog.ActionTrigger>
                <Button type="submit" loading={isSubmitting}>
                  Salvar
                </Button>
              </Dialog.Footer>

              <Dialog.CloseTrigger
                asChild
                position="absolute"
                top={3}
                right={3}
              >
                <Button size="xs" variant="ghost" p={0} borderRadius="full">
                  <LuX />
                </Button>
              </Dialog.CloseTrigger>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
