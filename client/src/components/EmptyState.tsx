import { Center, VStack, Box, Text } from "@chakra-ui/react";

interface SemResultadosProps {
  Icon: React.ReactNode;
  label: string;
  desc?: string;
}

export default function SemResultados({
  Icon,
  label,
  desc,
}: SemResultadosProps) {
  return (
    <Center
      py={16}
      bg="bg.muted"
      borderRadius="xl"
      borderWidth="1px"
      borderStyle="dashed"
    >
      <VStack gap={3} textStyle="center">
        <Box
          p={3}
          bg="bg.panel"
          borderRadius="full"
          boxShadow="xs"
          color="fg.muted"
        >
          {Icon}
        </Box>
        <Box>
          <Text fontWeight="semibold" fontSize="md" textAlign="center">
            {label}
          </Text>
          {desc && (
            <Text fontSize="sm" color="fg.muted" textAlign="center">
              {desc}
            </Text>
          )}
        </Box>
      </VStack>
    </Center>
  );
}
