import {
  HStack,
  Container,
  Input,
  Table,
  Badge,
  Popover,
  Portal,
  Text,
  Stack,
  Heading,
  Box,
  InputGroup,
  Flex,
} from "@chakra-ui/react";
import { LuSearch, LuCalendarX, LuInfo } from "react-icons/lu";
import { useState, useMemo } from "react";
import Header from "@/components/layout/Header";
import { useLoadAgenda } from "@/hooks/agenda-query/useAgendaQuery";
import BtnCreateAgendamento from "@/components/button/CreateAgendaButton";
import BtnCancelAgendamento from "@/components/button/CancelAgendaButton";
import Highlight from "@/components/ui/Highlight";
import NoResults from "@/components/EmptyState";
import { useLoadMe } from "@/hooks/user-query/useUserQuery";

interface Agendamento {
  id_agenda: number;
  data_agenda: string;
  tipo: string;
  status: "PENDENTE" | "CONFIRMADO" | "CANCELADO" | "CONCLUIDO";
  observacoes?: string;
}

const BADGE_COLOR: Record<Agendamento["status"], string> = {
  PENDENTE: "yellow",
  CONFIRMADO: "green",
  CANCELADO: "red",
  CONCLUIDO: "blue",
};

interface TableCellPopoverProps {
  observacoes?: string;
  status: string;
  title?: string;
}

const TableCellPopover = ({
  observacoes,
  status,
  title,
}: TableCellPopoverProps) => {
  if (!observacoes) {
    return (
      <Table.Cell display={{ base: "none", md: "table-cell" }}>—</Table.Cell>
    );
  }

  return (
    <Table.Cell
      maxW="200px"
      opacity={status === "CANCELADO" ? 0.5 : 1}
      display={{ base: "none", md: "table-cell" }}
    >
      <Popover.Root positioning={{ placement: "top" }}>
        <Popover.Trigger asChild>
          <HStack
            gap={1.5}
            _hover={{ color: "brand.solid", textDecor: "underline" }}
            cursor="pointer"
            w="fit-content"
          >
            <Text truncate maxW="150px" fontSize="sm">
              {observacoes}
            </Text>
            <LuInfo size={14} style={{ flexShrink: 0 }} />
          </HStack>
        </Popover.Trigger>
        <Portal>
          <Popover.Positioner>
            <Popover.Content
              borderRadius="lg"
              p={4}
              boxShadow="md"
              maxW="300px"
            >
              <Popover.Body>
                {title && (
                  <Text
                    fontWeight="bold"
                    fontSize="xs"
                    textTransform="uppercase"
                    color="fg.muted"
                    mb={2}
                  >
                    {title}
                  </Text>
                )}
                <Text fontSize="sm" whiteSpace="pre-wrap" color="fg.default">
                  {observacoes}
                </Text>
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
    </Table.Cell>
  );
};

interface RenderCellProps {
  text: string | number;
  pesquisa: string;
  status: string;
  isDate?: boolean;
}

const RenderCell = ({ text, pesquisa, status, isDate }: RenderCellProps) => {
  const valueFormatted =
    isDate && text ? new Date(text).toLocaleDateString("pt-BR") : text;

  return (
    <Table.Cell opacity={status === "CANCELADO" ? 0.5 : 1} fontWeight="medium">
      {pesquisa ? (
        <Highlight text={String(valueFormatted)} query={pesquisa} />
      ) : (
        valueFormatted
      )}
    </Table.Cell>
  );
};

interface MetricCardProps {
  label: string;
  value: number;
  colorPalette?: string;
}

const MetricCard = ({ label, value, colorPalette }: MetricCardProps) => {
  const isColored = Boolean(colorPalette);

  return (
    <Box
      px={5}
      py={3}
      borderRadius="xl"
      borderWidth="1px"
      minW="100px"
      textAlign="center"
      bg={isColored ? `${colorPalette}.subtle` : "bg.muted"}
      borderColor={isColored ? `${colorPalette}.muted` : "border.muted"}
    >
      <Text
        fontSize="xs"
        fontWeight="semibold"
        letterSpacing="wide"
        textTransform="uppercase"
        color={isColored ? `${colorPalette}.fg` : "fg.muted"}
      >
        {label}
      </Text>
      <Text
        fontSize="2xl"
        fontWeight="bold"
        color={isColored ? `${colorPalette}.fg` : "fg.default"}
        lineHeight="tight"
        mt={0.5}
      >
        {value}
      </Text>
    </Box>
  );
};

export default function Dashboard() {
  const { data: userData, isLoading: isLoadingUser } = useLoadMe();
  const isAdmin = !isLoadingUser && userData?.tipo_usuario === "ADMIN";
  const { data = [] } = useLoadAgenda(isAdmin, !isLoadingUser);

  const [pesquisa, setPesquisa] = useState("");

  const metrics = useMemo(
    () => ({
      total: data.length,
      pendentes: data.filter((i) => i.status === "PENDENTE").length,
      confirmados: data.filter((i) => i.status === "CONFIRMADO").length,
      cancelados: data.filter((i) => i.status === "CANCELADO").length,
    }),
    [data],
  );

  const dataFilter = useMemo(() => {
    if (!pesquisa.trim()) return data;

    const search = pesquisa.toLowerCase();

    return data.filter((item: Agendamento) =>
      Object.values(item).some((val) =>
        val?.toString().toLowerCase().includes(search),
      ),
    );
  }, [data, pesquisa]);

  return (
    <Box minH="100vh" bg={{ base: "gray.50", _dark: "gray.950" }}>
      <Header />

      <Container maxW="1200px" py={6}>
        <Stack gap={6}>
          <HStack
            justify="space-between"
            align="flex-end"
            flexWrap="wrap"
            gap={4}
          >
            <Box>
              <Heading size="lg" fontWeight="bold" letterSpacing="-0.02em">
                Painel de Agendamentos
              </Heading>
              <Text color="fg.muted" fontSize="sm" mt={1}>
                Gerencie e monitore o fluxo de solicitações da sua
                transportadora.
              </Text>
            </Box>

            <HStack gap={3} flexWrap="wrap">
              <MetricCard label="Total" value={metrics.total} />
              <MetricCard
                label="Pendentes"
                value={metrics.pendentes}
                colorPalette="yellow"
              />
              <MetricCard
                label="Confirmados"
                value={metrics.confirmados}
                colorPalette="green"
              />
              <MetricCard
                label="Cancelados"
                value={metrics.cancelados}
                colorPalette="red"
              />
            </HStack>
          </HStack>

          <HStack
            gap={4}
            bg="bg.panel"
            p={4}
            borderRadius="xl"
            borderWidth="1px"
            borderColor="border.subtle"
            boxShadow="xs"
          >
            <InputGroup flex={1} startElement={<LuSearch />}>
              <Input
                type="text"
                variant="outline"
                size="md"
                placeholder="Pesquisar por ID, Tipo, Status ou Observação..."
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
              />
            </InputGroup>
            <BtnCreateAgendamento />
          </HStack>

          {dataFilter.length > 0 ? (
            <Box
              borderRadius="xl"
              borderWidth="1px"
              borderColor="border.muted"
              overflow="hidden"
              boxShadow="sm"
              bg="bg.panel"
            >
              <Table.ScrollArea>
                <Table.Root size="md" interactive>
                  <Table.Header bg="bg.muted">
                    <Table.Row>
                      <Table.ColumnHeader width="10%">ID</Table.ColumnHeader>
                      <Table.ColumnHeader width="25%">
                        Data do Agendamento
                      </Table.ColumnHeader>
                      <Table.ColumnHeader width="20%">Tipo</Table.ColumnHeader>
                      <Table.ColumnHeader width="15%">
                        Status
                      </Table.ColumnHeader>
                      <Table.ColumnHeader
                        width="20%"
                        display={{ base: "none", md: "table-cell" }}
                      >
                        Observações
                      </Table.ColumnHeader>
                      <Table.ColumnHeader width="10%" textAlign="end">
                        Ações
                      </Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {dataFilter.map((item: Agendamento, i: number) => (
                      <Table.Row
                        key={item.id_agenda ?? i}
                        _hover={{ bg: "bg.subtle/50" }}
                      >
                        <RenderCell
                          text={item.id_agenda}
                          pesquisa={pesquisa}
                          status={item.status}
                        />
                        <RenderCell
                          text={item.data_agenda}
                          pesquisa={pesquisa}
                          status={item.status}
                        />
                        <RenderCell
                          text={item.tipo}
                          pesquisa={pesquisa}
                          status={item.status}
                        />
                        <Table.Cell>
                          <Badge
                            variant="subtle"
                            size="md"
                            borderRadius="full"
                            px={2.5}
                            py={0.5}
                            colorPalette={
                              BADGE_COLOR[
                                item.status as keyof typeof BADGE_COLOR
                              ] ?? "gray"
                            }
                          >
                            {pesquisa ? (
                              <Highlight text={item.status} query={pesquisa} />
                            ) : (
                              item.status
                            )}
                          </Badge>
                        </Table.Cell>

                        <TableCellPopover
                          observacoes={item.observacoes}
                          status={item.status}
                          title="Observações do Registro"
                        />

                        <Table.Cell textAlign="end">
                          <BtnCancelAgendamento
                            idAgenda={item.id_agenda}
                            isCancelled={item.status === "CANCELADO"}
                          />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Table.ScrollArea>
            </Box>
          ) : (
            <Flex
              direction="column"
              align="center"
              justify="center"
              py={20}
              gap={3}
            >
              <NoResults
                Icon={<LuCalendarX size={32} />}
                label="Nenhum agendamento encontrado"
                desc={
                  pesquisa
                    ? "Tente ajustar os termos da pesquisa ou limpe o filtro."
                    : 'Ainda não há agendamentos. Crie o primeiro clicando em "Novo Agendamento".'
                }
              />
            </Flex>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
