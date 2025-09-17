import { rqClient } from "@/shared/api/instance";

type UseVerbsListParams = {
  limit?: number;
  isFavorite?: boolean;
  search?: string;
  //   sort?: "name";
};

export function useVerbsList({
  limit = 20,
  isFavorite,
  search,
}: //   sort,
UseVerbsListParams) {
  const { data, isPending } = rqClient.useQuery("get", "/verbs", {
    params: {
      query: {
        page: 1,
        limit,
        isFavorite,
        search,
        // sort,
      },
    },
  });

  const verbs = data?.list ?? [];

  return { verbs, isPending };
}
