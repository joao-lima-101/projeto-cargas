export interface ChangeUserPasswordDTO {
  novaSenha: string;
  confSenha: string;
}

export interface DialogProps {
  open: boolean;
  onOpenChange: (details: { open: boolean }) => void;
}

export interface UserDialogProps extends DialogProps {
  idUser: number;
}

export interface TranspDialogProps extends DialogProps {
  idTransp: number;
}
