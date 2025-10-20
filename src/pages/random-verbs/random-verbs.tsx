import { useEffect, useMemo } from "react";

import { useDialogContext } from "@/app/context/dialog-context";
import { useFocusInputControl } from "@/features/study-verbs/model/use-focus-input-control";
import { useRandomStudyVerbs } from "@/features/study-verbs/model/use-random-study-verbs";
import { useTableColumns } from "@/features/study-verbs/model/use-table-columns";
import { FeedbackDialog } from "@/features/study-verbs/ui/feedback-dialog";
import { StudyVerbsTable } from "@/features/study-verbs/ui/table/study-verbs-table";
import { PageContent } from "@/shared/components/layout/page-content";
import { Loader } from "@/shared/ui/loader/loader";

function RandomVerbsPage() {
  const { studyVerbs, isPending } = useRandomStudyVerbs();

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
    if (studyVerbs.length > 0) {
      const t = setTimeout(() => focusFirstUnfilled(), 100);
      return () => clearTimeout(t);
    }
  }, [studyVerbs, focusFirstUnfilled]);

  const content = useMemo(() => {
    if (isPending) return <Loader />;

    if (!studyVerbs?.length) return null;

    return (
      <StudyVerbsTable
        data={studyVerbs}
        columns={columns}
        focusApi={focusApi}
      />
    );
  }, [isPending, studyVerbs, columns, focusApi]);

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

export const Component = RandomVerbsPage;
