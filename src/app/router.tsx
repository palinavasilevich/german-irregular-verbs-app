import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ROUTES } from "@/shared/constants/routes";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: ROUTES.HOME,
        lazy: () => import("@/pages/main-page/main-page"),
      },

      {
        path: ROUTES.VERBS,
        lazy: () => import("@/pages/verbs/verbs"),
      },

      {
        path: ROUTES.VERB,
        lazy: () => import("@/pages/verb/verb"),
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
