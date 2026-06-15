import { Box, Heading } from "@chakra-ui/react";
import {
  FormCadastro,
  type FormCadastroData,
} from "@/components/form/RegisterForm";
import { LuChevronLeft } from "react-icons/lu";
import NavButton from "@/components/nav/NavButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import errorMessage from "@/utils/notification/error";
import successMessage from "@/utils/notification/success";

export default function Cadastro() {
  const navigate = useNavigate();

  const onSubmit = async (data: FormCadastroData) => {
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
    }
  };

  return (
    <Box
      maxW="850px"
      mx="auto"
      my={{ base: "20px", md: "40px" }}
      p={{ base: 5, md: 8 }}
      borderWidth="1px"
      borderRadius="xl"
      boxShadow="md"
      bg="bg.panel"
      position="relative"
    >
      <Box
        position="absolute"
        top={{ base: 5, md: 8 }}
        left={{ base: 5, md: 8 }}
      >
        <NavButton path="/" Icon={LuChevronLeft} label="Voltar" />
      </Box>

      <Heading
        size="xl"
        mt={{ base: 12, md: 0 }}
        mb={8}
        textAlign="center"
        fontWeight="bold"
      >
        Cadastro de Transportadora
      </Heading>

      <FormCadastro onSubmit={onSubmit} />
    </Box>
  );
}
