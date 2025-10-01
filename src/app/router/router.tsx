import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { ROUTES } from "@/app/router/routes";
import { Providers } from "../providers";

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        path: ROUTES.HOME,
        lazy: () => import("@/pages/main-page/main-page"),
      },

      {
        path: ROUTES.VERBS,
        lazy: () => import("@/pages/all-verbs/all-verbs"),
      },

      {
        path: ROUTES.VERB,
        lazy: () => import("@/pages/verb/verb"),
      },

      {
        path: ROUTES.STUDY_VERBS,
        lazy: () => import("@/pages/study-verbs/study-verbs"),
      },

      {
        path: ROUTES.RANDOM_VERBS,
        lazy: () => import("@/pages/random-verbs/random-verbs"),
      },

      {
        path: ROUTES.FAVORITE_VERBS,
        lazy: () => import("@/pages/favorite-verbs/favorite-verbs"),
      },
    ],
  },
]);
