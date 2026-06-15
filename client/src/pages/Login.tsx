import {
  Center,
  Box,
  VStack,
  HStack,
  Input,
  InputGroup,
  Text,
  Heading,
  Field,
  Button,
} from "@chakra-ui/react";
import { LuMail } from "react-icons/lu";
import { ColorModeButton } from "@/components/ui/ColorMode";
import { useForm } from "react-hook-form";
import { ChakraRouterLink } from "@/components/ui/ChakraRouter";
import { InputSenha } from "@/components/ui/PasswordInput";
import { useState } from "react";
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import validarEmail from "@/utils/validate/email";
import errorMessage from "@/utils/notification/error";
import successMessage from "@/utils/notification/success";

interface LoginRequestDTO {
  login: string;
  senha: string;
}

export default function Login() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequestDTO>({
    mode: "onChange",
  });

  const onSubmit = async (data: LoginRequestDTO) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        data,
      );

      successMessage("Login efetuado com sucesso");
      login(response.data.token);
    } catch (error: unknown) {
      console.log(error);
      errorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center h="100vh" bg={{ base: "gray.50", _dark: "gray.950" }} p={4}>
      <ColorModeButton position="fixed" top="4" right="4" />

      <Box
        w="full"
        maxW="md"
        p={{ base: "6", md: "8" }}
        borderWidth="1px"
        borderRadius="xl"
        borderColor={{ base: "gray.200", _dark: "gray.800" }}
        bg={{ base: "white", _dark: "gray.900" }}
        boxShadow="sm"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack gap="6" align="stretch">
            <VStack gap="1" textAlign="center" mb={2}>
              <Heading size="xl" fontWeight="bold">
                Bem-vindo de volta
              </Heading>
              <Text color="fg.muted" fontSize="sm">
                Insira suas credenciais para acessar a plataforma
              </Text>
            </VStack>

            <Field.Root invalid={Boolean(errors.login)}>
              <Field.Label fontWeight="medium">E-mail</Field.Label>
              <InputGroup w="full" startElement={<LuMail color="gray.400" />}>
                <Input
                  type="text"
                  placeholder="exemplo@email.com"
                  {...register("login", {
                    required: "Campo obrigatório",
                    validate: validarEmail,
                  })}
                />
              </InputGroup>
              <Field.ErrorText>{errors.login?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={Boolean(errors.senha)}>
              <HStack justify="space-between" w="full">
                <Field.Label fontWeight="medium">Senha</Field.Label>
              </HStack>
              <InputSenha
                w="full"
                placeholder="Sua senha"
                {...register("senha", { required: "A senha é obrigatória" })}
              />
              <Field.ErrorText>{errors.senha?.message}</Field.ErrorText>
            </Field.Root>

            <VStack gap="4" mt={2}>
              <Button
                type="submit"
                loading={loading}
                loadingText="Conectando..."
                aria-busy={loading}
                w="full"
                colorPalette="red"
              >
                Entrar
              </Button>

              <Text fontSize="sm" color="fg.muted">
                Primeiro acesso?{" "}
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
    </Center>
  );
}
