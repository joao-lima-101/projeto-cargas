import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import type { ElementType } from "react";

interface NavButtonProps {
  path?: string;
  label?: string;
  Icon?: ElementType;
}

export default function NavButton({ path, label, Icon }: NavButtonProps) {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        navigate(path ?? "/");
      }}
      size="sm"
      variant="outline"
      aria-label={label ?? "Voltar"}
    >
      {Icon && <Icon />}
      {label && label}
    </Button>
  );
}
