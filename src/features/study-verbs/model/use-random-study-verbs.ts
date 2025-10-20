import { useEffect } from "react";

import { useGetAllVerbsQuery } from "@/entities/verb/api/use-verbs-query";
import { useVerbStore } from "@/entities/verb/model/store";

export const useRandomStudyVerbs = () => {
  const { verbs, isPending } = useGetAllVerbsQuery();
  const { studyVerbs, generateRandomVerbs } = useVerbStore();

  useEffect(() => {
    if (!isPending && verbs.length > 0 && studyVerbs.length === 0) {
      generateRandomVerbs(verbs);
    }
  }, [isPending, verbs, studyVerbs, generateRandomVerbs]);

  const refresh = () => generateRandomVerbs(verbs);

  return { studyVerbs, isPending, refresh };
};
