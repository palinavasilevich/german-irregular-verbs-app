import { Link, useLocation, useNavigate } from "react-router-dom";

import { cn } from "@/shared/lib/css";
import { useRandomStudyVerbs } from "@/features/study-verbs/model/useRandomStudyVerbs";
import { Button } from "@/shared/ui/kit/button";
import { Container } from "../Container";
import { ROUTES } from "@/app/router/routes";

import cls from "./header.module.css";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { refresh } = useRandomStudyVerbs();

  const handleStudyRandomVerbs = () => {
    refresh();
    navigate(ROUTES.RANDOM_VERBS);
  };

  return (
    <header className="bg-white border-b border-border/40 shadow-sm py-2">
      <Container className="h-20 flex items-center justify-between">
        <Link
          to={ROUTES.HOME}
          className="text-lg font-semibold uppercase text-center hover:text-purple-700"
        >
          Mighty
          <br />
          Verbs
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Button
            variant="link"
            disabled={location.pathname === ROUTES.VERBS}
            onClick={() => navigate(ROUTES.VERBS)}
            className={cn(
              cls.link,
              location.pathname === ROUTES.VERBS && cls.active,
            )}
          >
            Verbs List
          </Button>
          <Button
            variant="link"
            onClick={handleStudyRandomVerbs}
            disabled={location.pathname === ROUTES.RANDOM_VERBS}
            className={cn(
              cls.link,
              location.pathname === ROUTES.RANDOM_VERBS && cls.active,
            )}
          >
            Learn Random Verbs
          </Button>
        </nav>
      </Container>
    </header>
  );
}
