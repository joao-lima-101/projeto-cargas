import { toaster } from "@/components/ui/Toaster";

export default function successMessage(title: string, description?: string) {
  toaster.create({
    title: title,
    description: description || "",
    type: "success",
  });
}
