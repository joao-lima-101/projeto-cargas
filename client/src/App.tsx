import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider.tsx";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Toaster } from "./components/ui/Toaster.tsx";
import { ColorModeProvider } from "./components/ui/ColorMode.tsx";
import AppRoutes from "./routes/AppRoutes.tsx";
import errorMessage from "./utils/notification/error.ts";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: unknown) => {
      console.error(error);
      errorMessage(error);
    },
  }),
});

function App() {
  return (
    <BrowserRouter>
      <ColorModeProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AppRoutes />
            <Toaster />
          </AuthProvider>
        </QueryClientProvider>
      </ColorModeProvider>
    </BrowserRouter>
  );
}

export default App;
