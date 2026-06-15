import { Dialog, Portal, Button, CloseButton } from "@chakra-ui/react";
import type { DialogProps } from "@/types/dialog";

interface ConfirmDialogProps<
  T extends (...args: any[]) => any = () => void,
> extends DialogProps {
  onConfirm: T;
}

export default function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} role="alertdialog">
      <Portal>
        <Dialog.Backdrop backdropFilter="blur(4px)" />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Você tem certeza?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              Essa ação não pode ser desfeita, continuar?
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button>Não</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red" onClick={onConfirm}>
                Sim
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
