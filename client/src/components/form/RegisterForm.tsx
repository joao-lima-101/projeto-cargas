import {
  Button,
  Field,
  Heading,
  Input,
  SimpleGrid,
  GridItem,
  Stack,
  Separator,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import validarCNPJ from "@/utils/validate/cnpj";
import { PatternFormat } from "react-number-format";

export interface FormCadastroData {
  transportadoraDTO: {
    cnpj: string;
    razao_social: string;
    nome_fantasia?: string;
    inscricao_estadual?: string;
  };
  contatoDTO: {
    email: string;
    telefone?: string;
  };
  enderecoDTO: {
    cep: string;
    logradouro: string;
    bairro: string;
    numero?: string;
    complemento?: string;
    cidade: string;
    estado: string;
  };
}

interface FormCadastroProps {
  onSubmit: (data: FormCadastroData) => Promise<void> | void;
  loading?: boolean;
}

const MSG_OBRIGATORIO = "Campo obrigatório";

export function FormCadastro({ onSubmit, loading }: FormCadastroProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormCadastroData>({
    mode: "onChange",
  });
  const buscarCEP = async (rawCep: string, formattedCep: string) => {
    if (rawCep.length !== 8) return;

    if (errors.enderecoDTO?.cep) {
      clearErrors("enderecoDTO.cep");
    }

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${formattedCep}/json/`,
      );
      const data = await response.json();

      if (data.erro) {
        setError("enderecoDTO.cep", {
          type: "validate",
          message: "CEP não encontrado",
        });
        return;
      }

      setValue("enderecoDTO.logradouro", data.logradouro ?? "");
      setValue("enderecoDTO.bairro", data.bairro ?? "");
      setValue("enderecoDTO.cidade", data.localidade ?? "");
      setValue("enderecoDTO.estado", data.uf ?? "");
    } catch {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack gap={8}>
        <Stack gap={4}>
          <Heading
            size="sm"
            color="fg.muted"
            textTransform="uppercase"
            letterSpacing="wider"
          >
            Dados da Empresa
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            <Field.Root
              invalid={!!errors.transportadoraDTO?.razao_social}
              required
            >
              <Field.Label>Razão Social</Field.Label>
              <Input
                placeholder="Nome oficial da empresa"
                autoComplete="organization"
                {...register("transportadoraDTO.razao_social", {
                  required: MSG_OBRIGATORIO,
                })}
              />
              <Field.ErrorText>
                {errors.transportadoraDTO?.razao_social?.message}
              </Field.ErrorText>
            </Field.Root>

            <Field.Root>
              <Field.Label>Nome Fantasia</Field.Label>
              <Input
                placeholder="Nome comercial (opcional)"
                {...register("transportadoraDTO.nome_fantasia")}
              />
            </Field.Root>

            <Field.Root invalid={!!errors.transportadoraDTO?.cnpj} required>
              <Field.Label>CNPJ</Field.Label>
              <Controller
                name="transportadoraDTO.cnpj"
                control={control}
                rules={{
                  required: "O CNPJ é obrigatório",
                  validate: (value) => validarCNPJ(value) || "CNPJ inválido",
                }}
                render={({ field: { onChange, value, ref } }) => (
                  <PatternFormat
                    format="##.###.###/####-##"
                    mask="_"
                    value={value}
                    getInputRef={ref}
                    onValueChange={(values) => onChange(values.value)}
                    customInput={Input}
                    placeholder="00.000.000/0000-00"
                  />
                )}
              />
              <Field.ErrorText>
                {errors.transportadoraDTO?.cnpj?.message}
              </Field.ErrorText>
            </Field.Root>

            <Field.Root>
              <Field.Label>Inscrição Estadual</Field.Label>
              <Input
                placeholder="Isento ou número do registro"
                {...register("transportadoraDTO.inscricao_estadual")}
              />
            </Field.Root>
          </SimpleGrid>
        </Stack>

        <Separator />

        <Stack gap={4}>
          <Heading
            size="sm"
            color="fg.muted"
            textTransform="uppercase"
            letterSpacing="wider"
          >
            Informações de Contato
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            <Field.Root invalid={!!errors.contatoDTO?.email} required>
              <Field.Label>E-mail Corporativo</Field.Label>
              <Input
                type="email"
                autoComplete="email"
                placeholder="exemplo@empresa.com"
                {...register("contatoDTO.email", {
                  required: MSG_OBRIGATORIO,
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Formato de e-mail inválido",
                  },
                })}
              />
              <Field.ErrorText>
                {errors.contatoDTO?.email?.message}
              </Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.contatoDTO?.telefone}>
              <Field.Label>Telefone / WhatsApp</Field.Label>
              <Controller
                name="contatoDTO.telefone"
                control={control}
                render={({ field: { onChange, value, ref } }) => (
                  <PatternFormat
                    format="(##) #####-####"
                    mask="_"
                    value={value}
                    getInputRef={ref}
                    onValueChange={(values) => onChange(values.value)}
                    customInput={Input}
                    placeholder="(00) 00000-0000"
                    valueIsNumericString
                  />
                )}
              />
              <Field.ErrorText>
                {errors.contatoDTO?.telefone?.message}
              </Field.ErrorText>
            </Field.Root>
          </SimpleGrid>
        </Stack>

        <Separator />

        <Stack gap={4}>
          <Heading
            size="sm"
            color="fg.muted"
            textTransform="uppercase"
            letterSpacing="wider"
          >
            Localização
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 12 }} gap={4}>
            <GridItem colSpan={{ base: 1, md: 4 }}>
              <Field.Root invalid={!!errors.enderecoDTO?.cep} required>
                <Field.Label>CEP</Field.Label>
                <Controller
                  name="enderecoDTO.cep"
                  control={control}
                  rules={{ required: MSG_OBRIGATORIO }}
                  render={({ field: { onChange, value, ref } }) => (
                    <PatternFormat
                      format="#####-###"
                      mask="_"
                      value={value}
                      getInputRef={ref}
                      autoComplete="postal-code"
                      onValueChange={(values) => {
                        onChange(values.value);
                        buscarCEP(values.value, values.formattedValue);
                      }}
                      customInput={Input}
                      placeholder="00000-000"
                    />
                  )}
                />
                <Field.ErrorText>
                  {errors.enderecoDTO?.cep?.message}
                </Field.ErrorText>
              </Field.Root>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 3 }}>
              <Field.Root invalid={!!errors.enderecoDTO?.estado} required>
                <Field.Label>Estado (UF)</Field.Label>
                <Input
                  placeholder="Ex: PE"
                  autoComplete="address-level1"
                  {...register("enderecoDTO.estado", {
                    required: MSG_OBRIGATORIO,
                  })}
                />
                <Field.ErrorText>
                  {errors.enderecoDTO?.estado?.message}
                </Field.ErrorText>
              </Field.Root>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 5 }}>
              <Field.Root invalid={!!errors.enderecoDTO?.cidade} required>
                <Field.Label>Cidade</Field.Label>
                <Input
                  placeholder="Ex: Recife"
                  autoComplete="address-level2"
                  {...register("enderecoDTO.cidade", {
                    required: MSG_OBRIGATORIO,
                  })}
                />
                <Field.ErrorText>
                  {errors.enderecoDTO?.cidade?.message}
                </Field.ErrorText>
              </Field.Root>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 6 }}>
              <Field.Root invalid={!!errors.enderecoDTO?.logradouro}>
                <Field.Label>Logradouro (Rua/Avenida)</Field.Label>
                <Input
                  placeholder="Rua, Avenida, Travessa..."
                  autoComplete="street-address"
                  {...register("enderecoDTO.logradouro")}
                />
              </Field.Root>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 2 }}>
              <Field.Root>
                <Field.Label>Número</Field.Label>
                <Input placeholder="123" {...register("enderecoDTO.numero")} />
              </Field.Root>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 4 }}>
              <Field.Root>
                <Field.Label>Complemento</Field.Label>
                <Input
                  placeholder="Apto, Bloco, Sala..."
                  autoComplete="address-line2"
                  {...register("enderecoDTO.complemento")}
                />
              </Field.Root>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 12 }}>
              <Field.Root>
                <Field.Label>Bairro</Field.Label>
                <Input
                  placeholder="Bairro"
                  {...register("enderecoDTO.bairro")}
                />
              </Field.Root>
            </GridItem>
          </SimpleGrid>
        </Stack>

        <Button
          type="submit"
          size="lg"
          colorPalette="red"
          mt={4}
          width="full"
          loadingText="Finalizando cadastro..."
          loading={loading}
          aria-busy={loading}
          fontWeight="bold"
        >
          Finalizar Cadastro
        </Button>
      </Stack>
    </form>
  );
}
