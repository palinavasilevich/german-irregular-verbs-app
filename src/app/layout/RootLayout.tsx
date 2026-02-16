import { Outlet } from "react-router-dom";
import { Header } from "./header/Header";

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 flex-col flex-grow place-content-center bg-muted">
        <Outlet />
      </main>
    </div>
  );
}
