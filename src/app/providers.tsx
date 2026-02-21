import { queryClient } from "@/shared/api/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { DialogProvider } from "./context/DialogContext";
import { ThemeProvider } from "./context/ThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <DialogProvider>{children}</DialogProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
