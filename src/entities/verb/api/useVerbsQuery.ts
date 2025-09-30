import { rqClient } from "@/shared/api/instance";

export const useGetAllVerbsQuery = () => {
  const { data, isPending } = rqClient.useQuery("get", "/verbs", {
    query: { enabled: true },
  });

  return { verbs: data || [], isPending };
};

export const useGetVerbsByIdsQuery = (ids: string[]) => {
  const { data, isPending } = rqClient.useQuery("get", "/verbs", {
    params: { query: { ids: ids.join(",") } },
    query: { enabled: ids.length > 0 },
  });

  return { data, isPending };
};
