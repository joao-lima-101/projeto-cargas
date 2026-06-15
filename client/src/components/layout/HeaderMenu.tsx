import { Menu, Button, Portal } from "@chakra-ui/react";
import { LuUser, LuKey, LuLogOut, LuBuilding } from "react-icons/lu";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { useLoadMe } from "@/hooks/user-query/useUserQuery";
import ChangePasswordDialog from "../dialog/user/ChangePassDialog";
import ProfileDialog from "../dialog/user/UserProfileDialog";
import TranspListDialog from "../dialog/carrier/CarrierListDialog";

export default function MenuHeader() {
  const { logout } = useAuth();
  const { data: userData } = useLoadMe();
  const [openPassChange, setOpenPassChange] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openTransportadoras, setOpenTransportadoras] = useState(false);

  return (
    <>
      <Menu.Root positioning={{ placement: "bottom", offset: { mainAxis: 8 } }}>
        <Menu.Trigger asChild>
          <Button
            variant="ghost"
            borderRadius="full"
            w="40px"
            h="40px"
            p={0}
            minW="auto"
            _hover={{ bg: "bg.muted" }}
            aria-label="Menu do usuário"
          >
            <LuUser size={20} />
          </Button>
        </Menu.Trigger>

        <Portal>
          <Menu.Positioner>
            <Menu.Content
              minW="200px"
              py={1.5}
              borderRadius="xl"
              boxShadow="lg"
            >
              <Menu.ItemGroup>
                <Menu.Item
                  value="perfil"
                  onClick={() => setOpenProfile(true)}
                  cursor="pointer"
                  py={2.5}
                >
                  <LuUser />
                  Perfil
                </Menu.Item>

                <Menu.Item
                  value="trocar-senha"
                  onClick={() => setOpenPassChange(true)}
                  cursor="pointer"
                  py={2.5}
                >
                  <LuKey />
                  Trocar Senha
                </Menu.Item>
                {userData?.tipo_usuario === "ADMIN" && (
                  <Menu.Item
                    value="transportadoras"
                    onClick={() => setOpenTransportadoras(true)}
                    cursor="pointer"
                    py={2.5}
                  >
                    <LuBuilding />
                    Transportadoras
                  </Menu.Item>
                )}
              </Menu.ItemGroup>

              <Menu.Separator my={1} />

              <Menu.Item
                value="sair"
                onClick={logout}
                color="fg.error"
                _hover={{ bg: "bg.error.subtle", color: "fg.error" }}
                cursor="pointer"
                py={2.5}
              >
                <LuLogOut />
                Sair
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>

      {openPassChange && (
        <ChangePasswordDialog
          open={openPassChange}
          onOpenChange={(e) => setOpenPassChange(e.open)}
        />
      )}

      {openProfile && (
        <ProfileDialog
          open={openProfile}
          onOpenChange={(e) => setOpenProfile(e.open)}
        />
      )}

      {openTransportadoras && (
        <TranspListDialog
          open={openTransportadoras}
          onOpenChange={(e) => setOpenTransportadoras(e.open)}
        />
      )}
    </>
  );
}
