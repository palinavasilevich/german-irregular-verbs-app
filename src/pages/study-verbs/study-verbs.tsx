import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import { useGetVerbsByIdsQuery } from "@/entities/verb/api/use-verbs-query";

import { PageContent } from "@/shared/components/layout/page-content";
import { StudyVerbsTable } from "@/features/study-verbs/ui/table/study-verbs-table";
import { Loader } from "@/shared/ui/loader/loader";
import { shuffle } from "@/shared/lib/array";
import type { ApiSchemas } from "@/shared/api/schema";

import { useTableColumns } from "@/features/study-verbs/model/use-table-columns";

export function StudyVerbsPage() {
  const location = useLocation();

  const verbsIds = useMemo(() => {
    const idsParam = new URLSearchParams(location.search).get("ids") || "";
    return idsParam.split(",").filter(Boolean);
  }, [location.search]);

  const { data: verbs, isPending } = useGetVerbsByIdsQuery(verbsIds);

  const { columns, focusFirstInput } = useTableColumns();

  const [shuffledVerbs, setShuffledVerbs] = useState<ApiSchemas["Verb"][]>([]);

  useEffect(() => {
    if (verbs?.length) {
      setShuffledVerbs(shuffle(verbs));
    } else {
      setShuffledVerbs([]);
    }
  }, [verbs]);

  useEffect(() => {
    if (shuffledVerbs.length > 0) {
      const t = setTimeout(() => focusFirstInput(), 50);
      return () => clearTimeout(t);
    }
  }, [shuffledVerbs, focusFirstInput]);

  const content = useMemo(() => {
    if (isPending) return <Loader />;
    if (!verbs?.length) return null;

    return <StudyVerbsTable data={shuffledVerbs} columns={columns} />;
  }, [isPending, verbs, shuffledVerbs, columns]);

  return <PageContent title="Study Verbs">{content}</PageContent>;
}

export const Component = StudyVerbsPage;
