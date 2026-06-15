import {
  Dialog,
  Portal,
  Button,
  Table,
  Input,
  InputGroup,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import {
  LuBuilding,
  LuX,
  LuList,
  LuSearch,
  LuCircleX,
  LuPlus,
} from "react-icons/lu";
import { useState, useMemo } from "react";
import { useLoadTransp } from "@/hooks/carrier-query/useTranspQuery";
import type { DialogProps } from "@/types/dialog";
import TranspDialog from "./CarrierViewDialog";
import Highlight from "@/components/ui/Highlight";
import SemResultados from "@/components/EmptyState";
import TranspCreateDialog from "./CarrierCreateDialog";

export default function TranspListDialog({ open, onOpenChange }: DialogProps) {
  const [idTransp, setIdTransp] = useState(0);
  const [openTransp, setOpenTransp] = useState(false);
  const [openCadTransp, setOpenCadTransp] = useState(false);
  const [pesquisa, setPesquisa] = useState("");
  const { data: transpData } = useLoadTransp();

  const handleClick = (id: number) => {
    setIdTransp(id);
    setOpenTransp(true);
  };

  const dataFilter = useMemo(() => {
    if (!pesquisa.trim()) return transpData;

    const search = pesquisa.toLowerCase();

    return transpData?.filter((item: any) =>
      Object.values(item).some((val) =>
        val?.toString().toLowerCase().includes(search),
      ),
    );
  }, [transpData, pesquisa]);

  return (
    <>
      <Dialog.Root open={open} onOpenChange={onOpenChange} size="lg">
        <Portal>
          <Dialog.Backdrop backdropFilter="blur(4px)" />
          <Dialog.Positioner>
            <Dialog.Content borderRadius="xl" boxShadow="2xl" overflow="hidden">
              <Dialog.Header
                bg="bg.muted"
                py={4}
                px={6}
                borderBottomWidth="1px"
                borderColor="border.muted"
              >
                <Dialog.Title
                  fontSize="xl"
                  fontWeight="bold"
                  display="flex"
                  alignItems="center"
                  gap={2}
                >
                  <LuBuilding size={22} /> Transportadoras
                </Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                <SimpleGrid
                  columns={{ base: 1, md: 3 }}
                  gap={{ base: 2, md: 5 }}
                >
                  <GridItem colSpan={2}>
                    <InputGroup startElement={<LuSearch />} mb={5}>
                      <Input
                        type="text"
                        onChange={(e) => setPesquisa(e.target.value)}
                        placeholder="Pesquisar por transportadora"
                        size={"sm"}
                      />
                    </InputGroup>
                  </GridItem>

                  <GridItem colSpan={1}>
                    <Button
                      colorPalette={"green"}
                      size={"sm"}
                      onClick={() => setOpenCadTransp(true)}
                    >
                      {" "}
                      <LuPlus />
                      Criar transportadora
                    </Button>
                  </GridItem>
                </SimpleGrid>
                {dataFilter && dataFilter.length > 0 ? (
                  <Table.ScrollArea>
                    <Table.Root size="md" interactive>
                      <Table.Header bg="bg.muted">
                        <Table.Row>
                          <Table.ColumnHeader>
                            ID Transportadora
                          </Table.ColumnHeader>
                          <Table.ColumnHeader>Razão Social</Table.ColumnHeader>
                          <Table.ColumnHeader textAlign="end">
                            Ações
                          </Table.ColumnHeader>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {dataFilter?.map((item) => (
                          <Table.Row key={item.id_transp}>
                            <Table.Cell>
                              <Highlight
                                text={item.id_transp.toString()}
                                query={pesquisa}
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <Highlight
                                text={item.razao_social}
                                query={pesquisa}
                              />
                            </Table.Cell>
                            <Table.Cell textAlign="end">
                              <Button
                                variant="subtle"
                                size="sm"
                                onClick={() => handleClick(item.id_transp)}
                              >
                                <LuList />
                              </Button>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Root>
                  </Table.ScrollArea>
                ) : (
                  <SemResultados
                    Icon={<LuCircleX />}
                    label="Nenhuma transportadora encontrada"
                  />
                )}
              </Dialog.Body>

              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline" size="sm">
                    Fechar
                  </Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>

              <Dialog.CloseTrigger asChild>
                <Button size="xs" variant="ghost" p={0} borderRadius="full">
                  <LuX />
                </Button>
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      {openTransp && (
        <TranspDialog
          open={openTransp}
          onOpenChange={(e) => setOpenTransp(e.open)}
          idTransp={idTransp}
        />
      )}

      {openCadTransp && (
        <TranspCreateDialog
          open={openCadTransp}
          onOpenChange={(e) => setOpenCadTransp(e.open)}
        />
      )}
    </>
  );
}
