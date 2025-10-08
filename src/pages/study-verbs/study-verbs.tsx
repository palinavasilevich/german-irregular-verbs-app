import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import { useGetVerbsByIdsQuery } from "@/entities/verb/api/use-verbs-query";
import { useVerbsTableColumns } from "@/entities/verb/model/use-verbs-table-columns";

import { PageContent } from "@/shared/components/layout/page-content";
import { StudyVerbsTable } from "@/features/study-verbs/ui/table/study-verbs-table";
import { Loader } from "@/shared/ui/loader/loader";
import { shuffle } from "@/shared/lib/array";
import type { ApiSchemas } from "@/shared/api/schema";

import { useFocusNextInput } from "@/features/study-verbs/model/use-focus-next-input";

export function StudyVerbsPage() {
  const location = useLocation();

  const verbsIds = useMemo(() => {
    const idsParam = new URLSearchParams(location.search).get("ids") || "";
    return idsParam.split(",").filter(Boolean);
  }, [location.search]);

  const { data: verbs, isPending } = useGetVerbsByIdsQuery(verbsIds);

  // 🔹 Создаём фокус-API один раз на уровне страницы
  const focusApi = useFocusNextInput();

  // 🔹 Передаём focusApi в генератор колонок — колонки сразу получают registerInput/onRequestFocusNext
  const columns = useVerbsTableColumns({ withStudyMode: true, focusApi });

  const [shuffledVerbs, setShuffledVerbs] = useState<ApiSchemas["Verb"][]>([]);

  useEffect(() => {
    if (verbs?.length) {
      setShuffledVerbs(shuffle(verbs));
    } else {
      setShuffledVerbs([]);
    }
  }, [verbs]);

  const content = useMemo(() => {
    if (isPending) return <Loader />;
    if (!verbs?.length) return null;
    // 🔹 Передаём и columns, и focusApi в таблицу
    return (
      <StudyVerbsTable
        data={shuffledVerbs}
        columns={columns}
        focusApi={focusApi}
      />
    );
  }, [isPending, verbs, shuffledVerbs, columns, focusApi]);

  return <PageContent title="Study Verbs">{content}</PageContent>;
}

export const Component = StudyVerbsPage;
