import { useLocation } from "react-router-dom";
import { useGetVerbsByIdsQuery } from "@/entities/verb/api/use-verbs-query";
import { useVerbsTableColumns } from "@/entities/verb/ui/verbs-table/use-verbs-table-columns";

import { PageContent } from "@/shared/components/layout/page-content";
import { StudyVerbsTable } from "@/features/study-verbs/ui/table/study-verbs-table";
import { useEffect, useState } from "react";
import { shuffle } from "@/shared/lib/array";
import type { ApiSchemas } from "@/shared/api/schema";
import { Loader } from "@/shared/ui/loader/loader";

export function StudyVerbsPage() {
  const location = useLocation();

  const verbsIdsParam = new URLSearchParams(location.search).get("ids") || "";
  const verbsIds = verbsIdsParam.split(",");

  const { data: verbs, isPending } = useGetVerbsByIdsQuery(verbsIds);
  const columns = useVerbsTableColumns({ withStudyMode: true });

  const [shuffledVerbs, setShuffledVerbs] = useState<ApiSchemas["Verb"][]>([]);

  useEffect(() => {
    if (verbs?.length) {
      setShuffledVerbs(shuffle(verbs ?? []));
    }
  }, [verbs]);

  let content;

  if (isPending) {
    content = <Loader />;
  }

  if (!isPending && verbs?.length) {
    content = <StudyVerbsTable data={shuffledVerbs} columns={columns} />;
  }

  return <PageContent title="Study Verbs">{content}</PageContent>;
}

export const Component = StudyVerbsPage;
