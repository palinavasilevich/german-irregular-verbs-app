import { Link, NavLink } from "react-router-dom";
import { ROUTES } from "@/shared/constants/routes";
import logoImg from "@/assets/img/logo.svg";

import cls from "./header.module.css";
import { cn } from "@/shared/lib/css";

export const links = [
  {
    title: "Verbs List",
    path: ROUTES.VERBS,
  },

  {
    title: "Learn Random Verbs",
    path: ROUTES.RANDOM_VERBS,
  },
];

export function AppHeader() {
  return (
    <header className="bg-background border-b border-border/40 shadow-sm py-5 px-4 mb-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link to={ROUTES.HOME} className="uppercase">
          {/* <img src={logoImg} alt="logo" className="w-[70px]" /> */}
          Mighty verbs
        </Link>

        <nav className="flex items-center gap-4">
          {links.map((link) => (
            <NavLink
              key={link.title}
              to={link.path}
              className={({ isActive }) =>
                isActive ? cn(cls.link, cls.active) : cls.link
              }
            >
              {link.title}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
