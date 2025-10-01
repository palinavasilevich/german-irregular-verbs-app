import { HttpResponse } from "msw";
import { http } from "../../http";
import { type ApiSchemas } from "../../../schema";

import verbsList from "./verbsList";

// Generate verbs
function generateVerbs(): ApiSchemas["Verb"][] {
  return verbsList.map((verb) => ({
    ...verb,
    // id: crypto.randomUUID(),
    isFavorite: false,
  }));
}

const verbs: ApiSchemas["Verb"][] = generateVerbs();

export const verbsHandlers = [
  http.get("/verbs", async (ctx) => {
    const url = new URL(ctx.request.url);

    const idsParam = url.searchParams.get("ids");

    let filteredVerbs = [...verbs];

    if (idsParam) {
      const ids = idsParam.split(",").filter(Boolean);
      filteredVerbs = filteredVerbs.filter((v) => ids.includes(v.id));
    }

    return HttpResponse.json(filteredVerbs);
  }),

  http.get("/verbs/{verbId}", async ({ params }) => {
    const { verbId } = params;
    const verb = verbs.find((v) => v.id === verbId);

    if (!verb) {
      return HttpResponse.json(
        { message: "Board not found", code: "NOT_FOUND" },
        { status: 404 }
      );
    }

    return HttpResponse.json(verb);
  }),
];
