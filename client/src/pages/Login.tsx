import {
  Box,
  VStack,
  HStack,
  Input,
  InputGroup,
  Text,
  Heading,
  Field,
  Button,
  Flex,
} from "@chakra-ui/react";
import { LuMail, LuCalendarCheck, LuTruck } from "react-icons/lu";
import { ColorModeButton } from "@/components/ui/ColorMode";
import { useForm } from "react-hook-form";
import { ChakraRouterLink } from "@/components/ui/ChakraRouter";
import { InputSenha } from "@/components/ui/PasswordInput";
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import validarEmail from "@/utils/validate/email";
import errorMessage from "@/utils/notification/error";
import successMessage from "@/utils/notification/success";
import imgBackground from "@/assets/trucks.webp";

interface LoginRequestDTO {
  login: string;
  senha: string;
}

export default function Login() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequestDTO>({
    mode: "onChange",
  });

  const onSubmit = async (data: LoginRequestDTO) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        data,
      );

      successMessage("Login efetuado com sucesso");
      login(response.data.token);
    } catch (error: unknown) {
      errorMessage(error);
    }
  };

  return (
    <Flex h="100vh" w="100vw" overflow="hidden">
      <ColorModeButton position="fixed" top="4" right="4" zIndex="sticky" />

      <Flex
        flex="1"
        color="white"
        p={12}
        direction="column"
        display={{ base: "none", lg: "flex" }}
        bg={`linear-gradient(to right, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.35)), url(${imgBackground})`}
        bgSize="cover"
        bgPos="center"
      >
        <VStack align="start" gap={3} zIndex={2}>
          <HStack gap={2}>
            <LuTruck size={32} />
            <Heading size="2xl" fontWeight="bold" letterSpacing="tight">
              LogiSched
            </Heading>
          </HStack>
        </VStack>

        <VStack align="start" gap={6} zIndex={2} maxW="lg" my="auto">
          <Heading size="3xl" fontWeight="extrabold" lineHeight="tight">
            Gestão Inteligente de Agendamentos e Cargas.
          </Heading>
          <Text fontSize="lg" color="whiteAlpha.800">
            Simplifique a entrada e saída de transportadoras. Monitore suas
            janelas de coleta e entrega em tempo real com total segurança.
          </Text>
        </VStack>

        <VStack align="stretch" gap={4} zIndex={2}>
          <HStack
            gap={3}
            bg="whiteAlpha.200"
            borderWidth="1px"
            borderColor="whiteAlpha.300"
            p={4}
            borderRadius="lg"
            backdropFilter="blur(6px)"
          >
            <LuCalendarCheck size={24} />
            <Text fontSize="sm" fontWeight="medium">
              Evite filas no pátio: agende com antecedência e garanta sua janela
              de descarga.
            </Text>
          </HStack>

          <Text fontSize="xs" color="whiteAlpha.700">
            &copy; {new Date().getFullYear()} LogiSched. Todos os direitos
            reservados.
          </Text>
        </VStack>
      </Flex>

      <Flex
        w={{ base: "full", lg: "45%", xl: "35%" }}
        h="full"
        align="center"
        justify="center"
        p={{ base: 6, md: 12, xl: 16 }}
        bg={{ base: "white", _dark: "gray.900" }}
        boxShadow="2xl"
      >
        <Box
          w="full"
          maxW="md"
          bg={{ base: "white", _dark: "gray.800" }}
          borderWidth="1px"
          borderColor={{ base: "gray.100", _dark: "gray.700" }}
          borderRadius="2xl"
          p={{ base: 6, md: 8 }}
          boxShadow={{ base: "none", lg: "lg" }}
        >
          <HStack
            gap={2}
            mb={8}
            display={{ base: "flex", lg: "none" }}
            justify="center"
          >
            <LuTruck size={28} color="var(--chakra-colors-red-600)" />
            <Heading size="xl" fontWeight="bold">
              LogiSched
            </Heading>
          </HStack>

          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap="6" align="stretch">
              <VStack
                gap="2"
                align={{ base: "center", lg: "start" }}
                textAlign={{ base: "center", lg: "left" }}
              >
                <Heading size="2xl" fontWeight="bold" letterSpacing="tight">
                  Bem-vindo de volta
                </Heading>
                <Text color="fg.muted" fontSize="sm">
                  Insira suas credenciais para acessar o painel de agendamentos.
                </Text>
              </VStack>

              <Field.Root invalid={!!errors.login}>
                <Field.Label fontWeight="medium">
                  E-mail corporativo
                </Field.Label>
                <InputGroup
                  w="full"
                  startElement={
                    <LuMail color="var(--chakra-colors-fg-muted)" />
                  }
                >
                  <Input
                    type="text"
                    autoComplete="email"
                    placeholder="exemplo@transportadora.com"
                    disabled={isSubmitting}
                    borderColor={{ base: "", _dark: "fg.muted" }}
                    {...register("login", {
                      required: "Campo obrigatório",
                      validate: validarEmail,
                    })}
                  />
                </InputGroup>
                <Field.ErrorText>{errors.login?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.senha}>
                <HStack justify="space-between" w="full">
                  <Field.Label fontWeight="medium">Senha</Field.Label>
                  <ChakraRouterLink
                    to="/esqueci-senha"
                    fontSize="sm"
                    color="blue.500"
                    fontWeight="medium"
                    _hover={{ color: "blue.600", textDecor: "underline" }}
                  >
                    Esqueceu a senha?
                  </ChakraRouterLink>
                </HStack>
                <InputSenha
                  w="full"
                  borderColor={{ base: "", _dark: "fg.muted" }}
                  placeholder="Sua senha de acesso"
                  disabled={isSubmitting}
                  autoComplete="current-password"
                  {...register("senha", {
                    required: "A senha é obrigatória",
                  })}
                />
                <Field.ErrorText>{errors.senha?.message}</Field.ErrorText>
              </Field.Root>

              <VStack gap="4" mt={2}>
                <Button
                  type="submit"
                  loading={isSubmitting}
                  loadingText="Autenticando..."
                  aria-busy={isSubmitting}
                  w="full"
                  colorPalette="red"
                  size="lg"
                >
                  Entrar no Sistema
                </Button>

                <Text fontSize="sm" color="fg.muted" textAlign="center">
                  Sua transportadora é nova aqui?{" "}
                  <ChakraRouterLink
                    to="/cadastro"
                    color="blue.500"
                    fontWeight="semibold"
                    _hover={{ color: "blue.600", textDecor: "underline" }}
                  >
                    Cadastre-se
                  </ChakraRouterLink>
                </Text>
              </VStack>
            </VStack>
          </form>
        </Box>
      </Flex>
    </Flex>
  );
}
