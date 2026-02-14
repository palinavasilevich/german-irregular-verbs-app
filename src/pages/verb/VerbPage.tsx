import { useParams } from "react-router-dom";
import { type PathParams, ROUTES } from "@/app/router/routes";

function VerbPage() {
  const params = useParams<PathParams[typeof ROUTES.VERB]>();
  return <div>VerbPage {params.verbId}</div>;
}

export const Component = VerbPage;
