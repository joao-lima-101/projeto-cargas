import { forwardRef, useState } from "react";
import { Input, InputGroup, type InputProps } from "@chakra-ui/react";
import { LuLock, LuEye, LuEyeOff } from "react-icons/lu";

export const InputSenha = forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    const [verSenha, setVerSenha] = useState(false);

    return (
      <InputGroup
        startElement={<LuLock />}
        endElement={
          <div
            aria-label={verSenha ? "Esconder senha" : "Ver senha"}
            onClick={() => setVerSenha(!verSenha)}
          >
            {verSenha ? <LuEye /> : <LuEyeOff />}
          </div>
        }
      >
        <Input
          ref={ref}
          type={verSenha ? "text" : "password"}
          placeholder="Senha"
          {...props}
        />
      </InputGroup>
    );
  },
);
