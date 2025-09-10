import { Link } from "react-router-dom";
import { Button } from "@/shared/ui/kit/button";
import { ROUTES } from "@/shared/constants/routes";

import heroImg from "@/assets/img/hero.svg";

export function Hero() {
  return (
    <section className="py-12 xl:py-24 xl:pt-28 bg-no-repeat bg-bottom bg-cover dark:bg-none">
      <div className="container mx-auto h-[50dvh]">
        <div className="flex justify-between gap-8">
          <div className="flex max-w-[600px] flex-col justify-center mx-auto xl:mx-0 text-center xl:text-left">
            <h1 className="h1 mb-2">
              Learn and practice irregular German verbs
            </h1>
            <p className="subtitle max-w-[490px] mx-auto xl:mx-0">
              Immerse yourself in a unique learning experience as you explore
              and search through this collection of must-know irregular verbs.
            </p>
            <div className="flex flex-col gap-y-3 md:flex-row gap-x-3 mx-auto xl:mx-0 mb-12">
              <Button className="gap-x-2">
                <Link to={ROUTES.VERBS}> Verb list </Link>
              </Button>

              <Button variant="secondary" className="gap-x-2">
                <Link to={ROUTES.RANDOM_VERBS}>Practice</Link>
              </Button>
            </div>
          </div>
          <div className="hidden xl:flex">
            <div className="w-[450px] h-[400px] bg-no-repeat relative bg-bottom">
              <img src={heroImg} alt="hero_image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
