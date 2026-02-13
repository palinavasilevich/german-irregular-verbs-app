import { queryClient } from "@/shared/api/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { DialogProvider } from "./context/DialogContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <DialogProvider>{children}</DialogProvider>
    </QueryClientProvider>
  );
}
