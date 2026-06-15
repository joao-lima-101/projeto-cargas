import { Dialog, Portal, Button } from "@chakra-ui/react";
import { LuX } from "react-icons/lu";
import {
  FormCadastro,
  type FormCadastroData,
} from "@/components/form/RegisterForm";
import type { DialogProps } from "@/types/dialog";
import { useCreateTransp } from "@/hooks/carrier-query/useTranspQuery";

export default function TranspCreateDialog({
  open,
  onOpenChange,
}: DialogProps) {
  const { mutate: createTransportadora, isPending } = useCreateTransp();

  const onSubmit = async (data: FormCadastroData) => {
    createTransportadora(data);
  };

  return (
    <Dialog.Root size="cover" open={open} onOpenChange={onOpenChange}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header
              bg="bg.muted"
              py={4}
              px={6}
              borderBottomWidth="1px"
              borderColor="border.muted"
            >
              <Dialog.Title>Cadastrar transportadora</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <FormCadastro onSubmit={onSubmit} loading={isPending} />
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <Button variant="ghost">
                <LuX />
              </Button>
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
