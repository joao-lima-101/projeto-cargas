import {
  Dialog,
  Portal,
  Button,
  Input,
  Heading,
  Field,
  Select,
  Textarea,
  createListCollection,
  VStack,
} from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";
import { useCreateAgenda } from "@/hooks/agenda-query/useAgendaQuery";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

interface Agendamento {
  data_agenda: string;
  tipo: string;
  observacoes?: string;
}

const getMinDateTime = () => {
  const agora = new Date();

  const pad = (n: number) => String(n).padStart(2, "0");

  const ano = agora.getFullYear();
  const mes = pad(agora.getMonth() + 1);
  const dia = pad(agora.getDate());
  const horas = pad(agora.getHours());
  const minutos = pad(agora.getMinutes());

  return `${ano}-${mes}-${dia}T${horas}:${minutos}`;
};

export default function BtnCreateAgendamento() {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<Agendamento>({ mode: "onChange" });

  const { mutate, isPending } = useCreateAgenda();
  const [open, setOpen] = useState(false);

  const tiposAgendamento = createListCollection({
    items: [
      { label: "Coleta", value: "COLETA" },
      { label: "Entrega", value: "ENTREGA" },
      { label: "Devolução", value: "DEVOLUCAO" },
    ],
  });

  const onSubmit = (data: Agendamento) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        clearErrors();
        setOpen(false);
      },
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Button>
          Novo Agendamento <LuPlus />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Dialog.Header>
                <Heading>Criar agendamento</Heading>
              </Dialog.Header>
              <Dialog.Body>
                <VStack gap={4}>
                  <Field.Root invalid={!!errors.data_agenda}>
                    <Field.Label>Data do agendamento</Field.Label>
                    <Input
                      type="datetime-local"
                      min={getMinDateTime()}
                      {...register("data_agenda", {
                        required: "Escolha uma data",
                        validate: (value) => {
                          const dataSelecionada = new Date(value);
                          const agora = new Date();

                          agora.setSeconds(0, 0);

                          return (
                            dataSelecionada >= agora ||
                            "Escolha uma data e hora futura"
                          );
                        },
                      })}
                    />
                    <Field.ErrorText>
                      {errors.data_agenda?.message}
                    </Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.tipo} required>
                    <Field.Label>Tipo de agendamento</Field.Label>

                    <Controller
                      control={control}
                      name="tipo"
                      rules={{
                        required: "Escolha o tipo de agendamento",
                      }}
                      render={({ field }) => (
                        <Select.Root
                          name={field.name}
                          value={[field.value]}
                          onValueChange={(details) =>
                            field.onChange(details.value[0])
                          }
                          onExitComplete={() => field.onBlur()}
                          collection={tiposAgendamento}
                        >
                          <Select.HiddenSelect />
                          <Select.Control>
                            <Select.Trigger>
                              <Select.ValueText placeholder="Selecione um tipo" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                              <Select.Indicator />
                            </Select.IndicatorGroup>
                          </Select.Control>

                          <Select.Positioner>
                            <Select.Content>
                              {tiposAgendamento.items.map((tipo) => (
                                <Select.Item item={tipo} key={tipo.value}>
                                  {tipo.label}
                                  <Select.ItemIndicator />
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select.Positioner>
                        </Select.Root>
                      )}
                    />
                    <Field.ErrorText>{errors.tipo?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Observação</Field.Label>
                    <Textarea
                      rows={5}
                      placeholder="Opcional"
                      {...register("observacoes")}
                    />
                  </Field.Root>
                </VStack>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancelar</Button>
                </Dialog.ActionTrigger>
                <Button type="submit" loading={isPending}>
                  Enviar
                </Button>
              </Dialog.Footer>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
