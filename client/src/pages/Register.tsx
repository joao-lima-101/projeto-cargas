import { Box, Heading, Text, Flex, Separator } from "@chakra-ui/react";
import {
  FormCadastro,
  type FormCadastroData,
} from "@/components/form/RegisterForm";
import { LuChevronLeft, LuTruck } from "react-icons/lu";
import NavButton from "@/components/nav/NavButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import errorMessage from "@/utils/notification/error";
import successMessage from "@/utils/notification/success";

export default function Cadastro() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormCadastroData) => {
    setLoading(true);
    try {
      const response = await axios.post<{ message: string }>(
        `${import.meta.env.VITE_API_URL}/transportadora`,
        data,
      );

      successMessage(
        response.data.message,
        "Aguarde a criação de um login para acessar o portal",
      );

      navigate("/login");
    } catch (error: unknown) {
      errorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      minH="100vh"
      bg={{ base: "gray.50", _dark: "gray.950" }}
      py={{ base: 6, md: 12 }}
    >
      <Box maxW="850px" mx="auto" px={{ base: 4, md: 0 }}>
        <Box mb={4}>
          <NavButton path="/" Icon={LuChevronLeft} label="Voltar" />
        </Box>

        <Box
          p={{ base: 5, md: 8 }}
          borderWidth="1px"
          borderRadius="2xl"
          boxShadow="md"
          bg="bg.panel"
          borderColor="border.muted"
        >
          <Flex direction="column" align="center" gap={2} mb={8}>
            <Flex
              align="center"
              justify="center"
              w={12}
              h={12}
              borderRadius="xl"
              bg="red.subtle"
              color="red.fg"
              mb={1}
            >
              <LuTruck size={24} />
            </Flex>
            <Heading size="xl" fontWeight="bold" textAlign="center">
              Cadastro de Transportadora
            </Heading>
            <Text color="fg.muted" fontSize="sm" textAlign="center">
              Preencha os dados abaixo para solicitar acesso ao portal
              LogiSched.
            </Text>
          </Flex>

          <Separator mb={8} />

          <FormCadastro onSubmit={onSubmit} loading={loading} />
        </Box>

        <Text fontSize="xs" color="fg.subtle" textAlign="center" mt={6}>
          &copy; {new Date().getFullYear()} LogiSched. Todos os direitos
          reservados.
        </Text>
      </Box>
    </Box>
  );
}
