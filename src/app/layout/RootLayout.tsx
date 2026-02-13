import { Outlet } from "react-router-dom";
import { Header } from "./header/Header";

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 py-8 bg-muted">
        <Outlet />
      </main>
    </div>
  );
}
