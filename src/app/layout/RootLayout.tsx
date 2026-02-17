import { Outlet } from "react-router-dom";
import { Header } from "./header/Header";
import { Footer } from "./Footer";

export function RootLayout() {
  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 flex-col flex-grow place-content-center bg-muted">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
