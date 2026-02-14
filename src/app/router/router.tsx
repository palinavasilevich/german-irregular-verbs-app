import { createBrowserRouter } from "react-router-dom";

import { ROUTES } from "@/app/router/routes";
import { Providers } from "../providers";
import { RootLayout } from "../layout/RootLayout";

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <RootLayout />
      </Providers>
    ),
    children: [
      {
        path: ROUTES.HOME,
        lazy: () => import("@/pages/main-page/MainPage"),
      },

      {
        path: ROUTES.VERBS,
        lazy: () => import("@/pages/all-verbs/AllVerbs"),
      },

      {
        path: ROUTES.VERB,
        lazy: () => import("@/pages/verb/Verb"),
      },

      {
        path: ROUTES.STUDY_VERBS,
        lazy: () => import("@/pages/study-verbs/StudyVerbs"),
      },

      {
        path: ROUTES.RANDOM_VERBS,
        lazy: () => import("@/pages/random-verbs/RandomVerbs"),
      },

      {
        path: ROUTES.FAVORITE_VERBS,
        lazy: () => import("@/pages/favorite-verbs/FavoriteVerbs"),
      },
    ],
  },
]);
