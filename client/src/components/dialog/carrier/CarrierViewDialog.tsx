import {
  Dialog,
  Portal,
  Button,
  SimpleGrid,
  GridItem,
  Box,
  Text,
  Table,
  Separator,
  Stack,
  Heading,
  HStack,
  Badge,
} from "@chakra-ui/react";
import type { TranspDialogProps } from "@/types/dialog";
import formatarCnpj from "@/utils/formatCnpj";
import { LuBuilding2, LuX, LuBan, LuRefreshCw, LuPlus } from "react-icons/lu";
import { useState, useRef, useMemo } from "react";
import SemResultados from "@/components/EmptyState";
import { useGetTransp } from "@/hooks/carrier-query/useTranspQuery";
import {
  useLoadTranspUsers,
  useCancelUser,
} from "@/hooks/user-query/useUserQuery";
import ChangeUserPasswordDialog from "../user/AdminChangePassDialog";
import ConfirmDialog from "@/components/ConfirmDialog";
import CreateUserDialog from "../user/CreateUserDialog";

interface ProfileFieldProps {
  label: string;
  value?: React.ReactNode;
}

const ProfileField = ({ label, value }: ProfileFieldProps) => {
  return (
    <Box>
      <Text
        fontSize="xs"
        fontWeight="medium"
        color="fg.muted"
        textTransform="uppercase"
        letterSpacing="wider"
      >
        {label}
      </Text>
      <Text fontSize="md" fontWeight="semibold" color="fg.default" mt={0.5}>
        {value || "-"}
      </Text>
    </Box>
  );
};

export default function TranspDialog({
  open,
  onOpenChange,
  idTransp,
}: TranspDialogProps) {
  const { data: transpData } = useGetTransp({
    idTransp: idTransp,
    enabled: open,
  });
  const { data: userData } = useLoadTranspUsers({
    idTransp: idTransp,
    enabled: open,
  });
  const { mutate: cancelUser } = useCancelUser();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openCreateUser, setOpenCreateUser] = useState(false);
  const [openChangePass, setOpenChangePass] = useState(false);
  const idUser = useRef<number | null>(null);

  const transpFields = useMemo(() => {
    const dataFormatada = transpData?.data_cadastro
      ? new Date(transpData.data_cadastro).toLocaleDateString("pt-br")
      : "-";

    return [
      {
        label: "ID da Transportadora",
        value: transpData?.id_transp,
        fullWidth: false,
      },
      {
        label: "CNPJ",
        value: formatarCnpj(transpData?.cnpj),
        fullWidth: false,
      },
      {
        label: "Razão Social",
        value: transpData?.razao_social,
        fullWidth: true,
      },
      {
        label: "Nome Fantasia",
        value: transpData?.nome_fantasia,
        fullWidth: true,
      },
      {
        label: "Inscrição Estadual",
        value: transpData?.inscricao_estadual,
        fullWidth: false,
      },
      { label: "Data de Cadastro", value: dataFormatada, fullWidth: false },
    ];
  }, [transpData]);

  return (
    <>
      <Dialog.Root open={open} onOpenChange={onOpenChange} size="xl">
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
                <Dialog.Title
                  fontSize="xl"
                  fontWeight="bold"
                  display="flex"
                  alignItems="center"
                  gap={2}
                >
                  <LuBuilding2 />
                  {transpData?.razao_social}
                </Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                <Stack gap={10}>
                  <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    py={3}
                    px={5}
                    gapX={6}
                    gapY={4}
                  >
                    {transpFields.map((v) => (
                      <GridItem
                        key={v.label}
                        colSpan={v.fullWidth ? { base: 1, md: 2 } : 1}
                      >
                        <ProfileField label={v.label} value={v.value} />
                      </GridItem>
                    ))}
                  </SimpleGrid>

                  <Separator />

                  <HStack justify="space-between">
                    <Heading>Usuários</Heading>

                    <Button
                      variant="ghost"
                      aria-label="Adicionar usuário"
                      title="Adicionar usuário"
                      onClick={() => setOpenCreateUser(true)}
                    >
                      <LuPlus />
                    </Button>
                  </HStack>

                  {userData && userData.length > 0 ? (
                    <Table.ScrollArea>
                      <Table.Root>
                        <Table.Header>
                          <Table.Row>
                            <Table.ColumnHeader>
                              ID do usuário
                            </Table.ColumnHeader>
                            <Table.ColumnHeader>E-mail</Table.ColumnHeader>
                            <Table.ColumnHeader>Ativo</Table.ColumnHeader>
                            <Table.ColumnHeader textAlign="center">
                              Ações
                            </Table.ColumnHeader>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {userData?.map((item) => (
                            <Table.Row key={item.id_user}>
                              <Table.Cell>{item.id_user}</Table.Cell>
                              <Table.Cell>{item.email}</Table.Cell>
                              <Table.Cell>
                                <Badge
                                  colorPalette={item.ativo ? "green" : "red"}
                                >
                                  {item.ativo ? "SIM" : "NÃO"}
                                </Badge>
                              </Table.Cell>
                              <Table.Cell textAlign="center">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  title={
                                    item.ativo
                                      ? "Resetar senha"
                                      : "Usuário desativado"
                                  }
                                  aria-label="Resetar senha"
                                  onClick={() => {
                                    setOpenChangePass(true);
                                    idUser.current = item.id_user;
                                  }}
                                  disabled={!item.ativo}
                                >
                                  <LuRefreshCw />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  title={
                                    item.ativo
                                      ? "Desativar usuário"
                                      : "Usuário desativado"
                                  }
                                  aria-label="Desativar usuário"
                                  onClick={() => {
                                    setOpenConfirm(true);
                                    idUser.current = item.id_user;
                                  }}
                                  disabled={!item.ativo}
                                >
                                  <LuBan color="red" />
                                </Button>
                              </Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </Table.Root>
                    </Table.ScrollArea>
                  ) : (
                    <SemResultados
                      Icon={<LuX size={32} color="red" />}
                      label="Nenhum usuário encontrado"
                    />
                  )}
                </Stack>
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

      {openConfirm && idUser.current && (
        <ConfirmDialog
          open={openConfirm}
          onOpenChange={(e) => setOpenConfirm(e.open)}
          onConfirm={() => {
            if (!idUser.current) return;

            cancelUser(idUser.current, {
              onSuccess: () => setOpenConfirm(false),
            });
          }}
        />
      )}

      {openCreateUser && (
        <CreateUserDialog
          open={openCreateUser}
          onOpenChange={(e) => setOpenCreateUser(e.open)}
          idTransp={idTransp}
        />
      )}

      {openChangePass && idUser.current && (
        <ChangeUserPasswordDialog
          open={openChangePass}
          onOpenChange={(e) => setOpenChangePass(e.open)}
          idUser={idUser.current}
        />
      )}
    </>
  );
}
