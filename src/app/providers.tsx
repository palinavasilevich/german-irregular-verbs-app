import { queryClient } from "@/shared/api/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { DialogProvider } from "./context/dialog-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <DialogProvider>{children}</DialogProvider>
    </QueryClientProvider>
  );
}
