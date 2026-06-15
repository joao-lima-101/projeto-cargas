import { toaster } from "@/components/ui/Toaster";
import axios from "axios";

export default function errorMessage(error: unknown, message?: string) {
  const msg =
    message ??
    (axios.isAxiosError(error)
      ? error.response?.data?.message ||
        error.response?.data?.error ||
        "Erro na requisição"
      : "Erro inesperado");

  toaster.create({
    title: msg,
    type: "error",
  });
}
