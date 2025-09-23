import { rqClient } from "@/shared/api/instance";

type UseVerbsListParams = {
  isFavorite?: boolean;
};

export function useVerbsList({ isFavorite }: UseVerbsListParams) {
  const { data, isPending } = rqClient.useQuery("get", "/verbs", {
    params: {
      query: {
        isFavorite,
      },
    },
  });

  const verbs = data?.list ?? [];

  return { verbs, isPending };
}
