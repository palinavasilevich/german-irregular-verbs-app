import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetVerbsByIdsQuery } from "@/entities/verb/api/use-verbs-query";
import { PageContent } from "@/shared/components/layout/page-content";
import { StudyVerbsTable } from "@/features/study-verbs/ui/table/study-verbs-table";
import { Loader } from "@/shared/ui/loader/loader";
import { shuffle } from "@/shared/lib/array";
import type { ApiSchemas } from "@/shared/api/schema";
import { useTableColumns } from "@/features/study-verbs/model/use-table-columns";
import { useFocusInputControl } from "@/features/study-verbs/model/use-focus-input-control";
import { FeedbackDialog } from "@/features/study-verbs/ui/feedback-dialog";
import { useDialogContext } from "@/app/context/dialog-context";

export function StudyVerbsPage() {
  const location = useLocation();

  const verbsIds = useMemo(() => {
    const idsParam = new URLSearchParams(location.search).get("ids") || "";
    return idsParam.split(",").filter(Boolean);
  }, [location.search]);

  const { data: verbs, isPending } = useGetVerbsByIdsQuery(verbsIds);
  const [shuffledVerbs, setShuffledVerbs] = useState<ApiSchemas["Verb"][]>([]);

  const focusApi = useFocusInputControl();
  const { columns } = useTableColumns(focusApi);
  const { focusFirstUnfilled, areAllFilled, getResults, resetInputs } =
    focusApi;

  const { openDialog } = useDialogContext();

  useEffect(() => {
    const interval = setInterval(() => {
      if (areAllFilled()) {
        const results = getResults();
        openDialog("feedback", results);
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [areAllFilled, getResults, openDialog]);

  useEffect(() => {
    if (verbs?.length) setShuffledVerbs(shuffle(verbs));
    else setShuffledVerbs([]);
  }, [verbs]);

  useEffect(() => {
    if (shuffledVerbs.length > 0) {
      const t = setTimeout(() => focusFirstUnfilled(), 100);
      return () => clearTimeout(t);
    }
  }, [shuffledVerbs, focusFirstUnfilled]);

  const content = useMemo(() => {
    if (isPending) return <Loader />;
    if (!verbs?.length) return null;

    return (
      <StudyVerbsTable
        data={shuffledVerbs}
        columns={columns}
        focusApi={focusApi}
      />
    );
  }, [isPending, verbs, shuffledVerbs, columns, focusApi]);

  return (
    <PageContent title="Study Verbs">
      {content}
      <FeedbackDialog
        resetInputs={resetInputs}
        focusFirstUnfilled={focusFirstUnfilled}
      />
    </PageContent>
  );
}

export const Component = StudyVerbsPage;
