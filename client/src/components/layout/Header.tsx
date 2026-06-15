import { HStack, Text, Box, Container, Badge } from "@chakra-ui/react";
import MenuHeader from "./HeaderMenu";
import { useLoadMe } from "@/hooks/user-query/useUserQuery";

import { ColorModeButton } from "../ui/ColorMode";

const badgeColor = {
  ADMIN: "yellow",
  USER: "blue",
};

export default function Header() {
  const { data: userData } = useLoadMe();

  return (
    <Box
      as="header"
      w="full"
      borderBottomWidth="1px"
      borderColor="border.subtle"
      position="sticky"
      top={0}
      zIndex="sticky"
      backdropFilter="blur(8px)"
    >
      <Container maxW="breakpoint-xl" px={4} py={3}>
        <HStack justifyContent="space-between" width="full">
          <HStack gap={6}>
            <MenuHeader />
          </HStack>

          <HStack gap={4}>
            {userData?.tipo_usuario && (
              <Badge
                colorPalette={
                  badgeColor[
                    userData.tipo_usuario as keyof typeof badgeColor
                  ] || "gray"
                }
              >
                {userData.tipo_usuario}
              </Badge>
            )}
            {userData?.email && (
              <Text textStyle="sm" color="fg.muted" fontWeight="medium">
                {userData.email}
              </Text>
            )}

            <ColorModeButton />
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
}
