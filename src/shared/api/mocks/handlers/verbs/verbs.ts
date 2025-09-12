import { HttpResponse } from "msw";
import { http } from "../../http";
import { type ApiSchemas } from "../../../schema";

import verbsList from "./verbsList";

// Generate verbs
function generateVerbs(): ApiSchemas["Verb"][] {
  return verbsList.map((verb) => ({
    ...verb,
    id: crypto.randomUUID(),
    isFavorite: false,
  }));
}

// Create 1000 verbs
const verbs: ApiSchemas["Verb"][] = generateVerbs();

export const verbsHandlers = [
  http.get("/verbs", async (ctx) => {
    const url = new URL(ctx.request.url);
    const page = Number(url.searchParams.get("page") || 1);
    const limit = Number(url.searchParams.get("limit") || 10);

    const search = url.searchParams.get("search");
    const isFavorite = url.searchParams.get("isFavorite");
    const sort = url.searchParams.get("sort");

    let filteredVerbs = [...verbs];

    // Filter by search
    if (search) {
      filteredVerbs = filteredVerbs.filter((verb) =>
        verb.infinitive.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by favorites
    if (isFavorite !== null) {
      const isFav = isFavorite === "true";
      filteredVerbs = filteredVerbs.filter((verb) => verb.isFavorite === isFav);
    }

    // Sort
    if (sort === "infinitive") {
      filteredVerbs.sort((a, b) => a.infinitive.localeCompare(b.infinitive));
    }

    const total = filteredVerbs.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedVerbs = filteredVerbs.slice(startIndex, endIndex);

    return HttpResponse.json({
      list: paginatedVerbs,
      total,
      totalPages,
    });
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
