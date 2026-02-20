import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useGetVerbsByIdsQuery } from "@/entities/verb/api/useVerbsQuery";
import { StudyVerbsTable } from "@/features/study-verbs/ui/table/StudyVerbsTable";
import { Loader } from "@/shared/ui/loader/loader";
import { FeedbackDialog } from "@/features/study-verbs/ui/FeedbackDialog";
import { Button } from "@/shared/ui/kit/button";
import { RepeatIcon } from "lucide-react";
import { useStudyVerbsFlow } from "@/features/study-verbs/model/useStudyVerbsFlow";
import { PageContent } from "@/app/layout/PageContent";
import { useDialogContext } from "@/app/context/DialogContext";

export function StudyVerbsPage() {
  const location = useLocation();

  const verbsIds = useMemo(() => {
    const ids = new URLSearchParams(location.search).get("ids") || "";
    return ids.split(",").filter(Boolean);
  }, [location.search]);

  const { data: verbs, isPending } = useGetVerbsByIdsQuery(verbsIds);

  const { shuffled, columns, focusApi, learnAgain, repeatIncorrect } =
    useStudyVerbsFlow({ verbs });

  const { dialog } = useDialogContext();

  if (isPending) return <Loader />;

  const isFeedbackDialogOpen = dialog?.type === "feedback";

  const incorrectCount =
    dialog?.type === "feedback" ? dialog.data.incorrect : 0;

  return (
    <PageContent title="Study Verbs">
      {!isFeedbackDialogOpen && dialog?.type === "feedback" && (
        <div className="flex gap-4 mb-6">
          {incorrectCount > 0 && (
            <Button onClick={repeatIncorrect}>
              <RepeatIcon />
              Repeat only incorrect verbs
            </Button>
          )}
          <Button onClick={learnAgain}>
            <RepeatIcon />
            Learn verbs again
          </Button>
        </div>
      )}

      <StudyVerbsTable data={shuffled} columns={columns} focusApi={focusApi} />

      <FeedbackDialog
        onLearnVerbsAgain={learnAgain}
        onRepeatIncorrect={repeatIncorrect}
      />
    </PageContent>
  );
}

export const Component = StudyVerbsPage;
