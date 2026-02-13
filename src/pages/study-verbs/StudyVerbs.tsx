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

export function StudyVerbsPage() {
  const location = useLocation();
  const verbsIds = useMemo(() => {
    const ids = new URLSearchParams(location.search).get("ids") || "";
    return ids.split(",").filter(Boolean);
  }, [location.search]);

  const { data: verbs, isPending } = useGetVerbsByIdsQuery(verbsIds);

  const {
    shuffled,
    columns,
    focusApi,
    feedbackResults,
    learnAgain,
    repeatIncorrect,
    isLearnAgainShown,
    setIsLearnAgainShown,
  } = useStudyVerbsFlow({ verbs });

  if (isPending) return <Loader />;

  return (
    <PageContent title="Study Verbs">
      {isLearnAgainShown && (
        <div className="flex gap-4 mb-6">
          {feedbackResults && feedbackResults?.incorrect > 0 && (
            <Button onClick={repeatIncorrect}>
              <RepeatIcon /> Repeat only incorrect verbs
            </Button>
          )}
          <Button onClick={learnAgain}>
            <RepeatIcon /> Learn verbs again
          </Button>
        </div>
      )}

      <StudyVerbsTable data={shuffled} columns={columns} focusApi={focusApi} />

      <FeedbackDialog
        onClose={() => setIsLearnAgainShown(true)}
        onLearnVerbsAgain={learnAgain}
        onRepeatIncorrect={repeatIncorrect}
      />
    </PageContent>
  );
}

export const Component = StudyVerbsPage;
