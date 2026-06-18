import {
  Box,
  VStack,
  Stack,
  Text,
  Heading,
  Center,
  Input,
  InputGroup,
  Field,
  Button,
} from "@chakra-ui/react";
import { LuMail, LuTruck, LuArrowLeft } from "react-icons/lu";
import { ColorModeButton } from "@/components/ui/ColorMode";
import { useNavigate } from "react-router-dom";
import { useState, type SubmitEvent } from "react";
import validarEmail from "@/utils/validate/email";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (value: string) => {
    setEmail(value);

    const errorMessage =
      value.length === 0 ? "" : !validarEmail(value) ? "E-mail inválido" : "";

    setError(errorMessage);
  };

  const handleSubmit = (evt: SubmitEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(`E-mail é o ${email}`);
  };

  return (
    <Center h="100vh">
      <Box
        w="full"
        maxW="md"
        pos="relative"
        bg={{ base: "white", _dark: "gray.800" }}
        borderWidth="1px"
        borderColor={{ base: "gray.100", _dark: "gray.700" }}
        borderRadius="2xl"
        p={{ base: 6, md: 8 }}
        boxShadow={{ base: "none", lg: "lg" }}
      >
        <Button
          variant="ghost"
          size="sm"
          pos="absolute"
          left={3}
          top={3}
          onClick={() => navigate("/login")}
        >
          <LuArrowLeft /> Voltar
        </Button>

        <ColorModeButton pos="absolute" right={3} top={3} />

        <VStack textAlign="center" p={5} gap={5}>
          <LuTruck size={32} />

          <Heading>Recuperar Senha</Heading>
          <Text>
            Digite o e-mail onde será recebido as instruções de alteração da
            senha
          </Text>
        </VStack>
        <form onSubmit={handleSubmit}>
          <Field.Root invalid={!!error} gap={5} required>
            <Stack w="full" gap={1}>
              <Field.Label>E-mail</Field.Label>
              <InputGroup startElement={<LuMail />}>
                <Input
                  type="email"
                  borderColor={{ base: "", _dark: "fg.muted" }}
                  placeholder="Digite um e-mail cadastrado"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                />
              </InputGroup>
              <Field.ErrorText>{error}</Field.ErrorText>
            </Stack>
            <Button type="submit" colorPalette="red" w="full">
              Enviar e-mail
            </Button>
          </Field.Root>
        </form>
      </Box>
    </Center>
  );
}
