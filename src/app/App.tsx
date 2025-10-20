import { Outlet } from "react-router-dom";
import { AppHeader } from "@/shared/components/header/header";

export function App() {
  return (
    <>
      <AppHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
}
