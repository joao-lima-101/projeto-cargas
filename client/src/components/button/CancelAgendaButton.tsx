import { LuTrash } from "react-icons/lu";
import { Button } from "@chakra-ui/react";
import { useCancelAgenda } from "@/hooks/agenda-query/useAgendaQuery";
import { useState } from "react";
import ConfirmDialog from "../ConfirmDialog";

interface CancelAgendamentoProps {
  idAgenda: number;
  isCancelled: boolean;
}

export default function BtnCancelAgendamento({
  idAgenda,
  isCancelled,
}: CancelAgendamentoProps) {
  const [open, setOpen] = useState(false);
  const { mutate } = useCancelAgenda();

  return (
    <>
      <Button
        size="xs"
        variant="ghost"
        disabled={isCancelled}
        onClick={() => setOpen(true)}
      >
        <LuTrash color="red" />
      </Button>

      {open && (
        <ConfirmDialog
          open={open}
          onOpenChange={(e) => setOpen(e.open)}
          onConfirm={() =>
            mutate(idAgenda, { onSuccess: () => setOpen(false) })
          }
        />
      )}
    </>
  );
}
