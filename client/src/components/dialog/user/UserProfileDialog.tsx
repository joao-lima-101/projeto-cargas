import {
  Dialog,
  Portal,
  SimpleGrid,
  Stack,
  Text,
  Heading,
  Box,
  Separator,
  Button,
  GridItem,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { LuUser, LuBuilding2, LuX } from "react-icons/lu";
import { useLoadMe } from "@/hooks/user-query/useUserQuery";
import { useMemo } from "react";
import { useGetTransp } from "@/hooks/carrier-query/useTranspQuery";
import type { DialogProps } from "@/types/dialog";
import formatarCnpj from "@/utils/formatCnpj";

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

export default function ProfileDialog({ open, onOpenChange }: DialogProps) {
  const { data: userData } = useLoadMe();
  const { data: transpData, isLoading } = useGetTransp({
    idTransp: userData?.id_transp,
    enabled: open,
  });

  const userFields = useMemo(
    () => [
      { label: "ID do Usuário", value: userData?.id_user },
      { label: "E-mail Cadastrado", value: userData?.email },
      { label: "Tipo de usuário", value: userData?.tipo_usuario },
    ],
    [userData],
  );

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
    <Dialog.Root
      open={open}
      onOpenChange={onOpenChange}
      size="lg"
      placement="center"
    >
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
                <LuUser size={22} /> Perfil do Usuário
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body py={6} px={6}>
              <Stack gap={6}>
                <Box>
                  <Heading
                    size="xs"
                    mb={4}
                    color="brand.solid"
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    Dados de Acesso
                  </Heading>
                  <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    gap={4}
                    p={4}
                    bg="bg.subtle"
                    borderRadius="lg"
                  >
                    {userFields.map((v) => (
                      <ProfileField
                        key={v.label}
                        label={v.label}
                        value={v.value}
                      />
                    ))}
                  </SimpleGrid>
                </Box>

                <Separator />

                <Box>
                  <Heading
                    size="xs"
                    mb={4}
                    color="brand.solid"
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <LuBuilding2 size={16} /> Empresa Vinculada
                  </Heading>

                  {isLoading ? (
                    <Center py={10}>
                      <Spinner size="md" color="brand.solid" />
                    </Center>
                  ) : (
                    <SimpleGrid columns={{ base: 1, md: 2 }} gapX={6} gapY={4}>
                      {transpFields.map((v) => (
                        <GridItem
                          key={v.label}
                          colSpan={v.fullWidth ? { base: 1, md: 2 } : 1}
                        >
                          <ProfileField label={v.label} value={v.value} />
                        </GridItem>
                      ))}
                    </SimpleGrid>
                  )}
                </Box>
              </Stack>
            </Dialog.Body>

            <Dialog.Footer
              borderTopWidth="1px"
              borderColor="border.muted"
              py={3}
              px={6}
              bg="bg.muted"
            >
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
  );
}
