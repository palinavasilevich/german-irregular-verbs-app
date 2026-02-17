import { ROUTES } from "@/app/router/routes";
import { useRandomStudyVerbs } from "@/features/study-verbs/model/useRandomStudyVerbs";
import { Button } from "@/shared/ui/kit/button";
import { Link, useNavigate } from "react-router-dom";

import heroImg from "@/assets/img/hero.svg";
import { PageContent } from "@/app/layout/PageContent";

function MainPage() {
  const navigate = useNavigate();
  const { refresh } = useRandomStudyVerbs();

  const handleStudyRandomVerbs = () => {
    refresh();
    navigate(ROUTES.RANDOM_VERBS);
  };

  return (
    <PageContent>
      <div className="flex justify-between gap-8">
        <div className="max-w-[600px] flex flex-col gap-5 justify-center mx-auto xl:mx-0 text-center xl:text-left">
          <h1 className="h1">Learn and practice irregular German verbs</h1>
          <p className="subtitle mx-auto xl:mx-0">
            Immerse yourself in a unique learning experience as you explore and
            search through this collection of must-know irregular verbs.
          </p>
          <div className="flex flex-col gap-3 md:flex-row mx-auto xl:mx-0">
            <Button className="gap-x-2">
              <Link to={ROUTES.VERBS}>Verbs list</Link>
            </Button>

            <Button
              className="gap-x-2 cursor-pointer bg-gray-400 hover:bg-gray-600"
              onClick={handleStudyRandomVerbs}
            >
              Practice
            </Button>
          </div>
        </div>
        <div className="hidden xl:flex">
          <div className="w-[450px] h-[400px] bg-no-repeat relative bg-bottom">
            <img src={heroImg} alt="hero_image" />
          </div>
        </div>
      </div>
    </PageContent>
  );
}

export const Component = MainPage;
