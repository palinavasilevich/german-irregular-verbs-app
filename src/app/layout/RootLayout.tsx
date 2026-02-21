import { Outlet } from "react-router-dom";
import { Header } from "./header/Header";
import { Footer } from "./Footer";
import { Suspense } from "react";
import { Loader } from "@/shared/ui/loader/loader";

export function RootLayout() {
  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 flex-col flex-grow place-content-center bg-muted">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
