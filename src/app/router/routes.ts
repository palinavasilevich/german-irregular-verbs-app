import "react-router-dom";

export const ROUTES = {
  HOME: "/",
  VERBS: "/verbs",
  VERB: "/verbs/:verbId",
  STUDY_VERBS: "/study",
  RANDOM_VERBS: "/random-verbs",
  FAVORITE_VERBS: "/favorite-verbs",
} as const;

export type PathParams = {
  [ROUTES.VERB]: {
    verbId: string;
  };
};

declare module "react-router-dom" {
  interface Register {
    params: PathParams;
  }
}
