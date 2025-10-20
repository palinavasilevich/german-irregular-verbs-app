import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "@/app/router/routes";
import logoImg from "@/assets/img/logo.svg";

import cls from "./header.module.css";
import { cn } from "@/shared/lib/css";
import { useRandomStudyVerbs } from "@/features/study-verbs/model/use-random-study-verbs";
import { Button } from "@/shared/ui/kit/button";

export function AppHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const { refresh } = useRandomStudyVerbs();

  const handleStudyRandomVerbs = () => {
    refresh();
    navigate(ROUTES.RANDOM_VERBS);
  };

  return (
    <header className="bg-background border-b border-border/40 shadow-sm py-2">
      <div className="container mx-auto flex items-center justify-between">
        <Link to={ROUTES.HOME} className="uppercase">
          <img src={logoImg} alt="logo" className="w-[70px]" />
        </Link>

        <nav className="flex items-center gap-4">
          <Button
            variant="link"
            className={
              location.pathname === ROUTES.VERBS
                ? cn(cls.link, cls.active)
                : cls.link
            }
          >
            <Link to={ROUTES.VERBS}>Verbs List</Link>
          </Button>

          <Button
            variant="link"
            onClick={handleStudyRandomVerbs}
            disabled={location.pathname === ROUTES.RANDOM_VERBS}
            className={
              location.pathname === ROUTES.RANDOM_VERBS
                ? cn(cls.link, cls.active)
                : cls.link
            }
          >
            Learn Random Verbs
          </Button>
        </nav>
      </div>
    </header>
  );
}
