import { useMemo } from "react";
import { PageContent } from "@/shared/components/layout/page-content";
import { Loader } from "@/shared/ui/loader/loader";
import { StudyVerbsTable } from "@/features/study-verbs/ui/table/study-verbs-table";
import { FeedbackDialog } from "@/features/study-verbs/ui/feedback-dialog";
import { useRandomStudyVerbs } from "@/features/study-verbs/model/use-random-study-verbs";
import { useStudyVerbsFlow } from "@/features/study-verbs/model/use-study-verbs-flow";

function RandomVerbsPage() {
  const { studyVerbs, isPending } = useRandomStudyVerbs();
  const {
    shuffled,
    columns,
    focusApi,
    learnAgain,
    repeatIncorrect,
    setIsLearnAgainShown,
  } = useStudyVerbsFlow({ verbs: studyVerbs });

  const content = useMemo(() => {
    if (isPending) return <Loader />;
    if (!studyVerbs?.length) return null;

    return (
      <StudyVerbsTable data={shuffled} columns={columns} focusApi={focusApi} />
    );
  }, [isPending, studyVerbs, shuffled, columns, focusApi]);

  return (
    <PageContent title="Study Verbs">
      {content}
      <FeedbackDialog
        onLearnVerbsAgain={learnAgain}
        onRepeatIncorrect={repeatIncorrect}
        onClose={() => setIsLearnAgainShown(true)}
      />
    </PageContent>
  );
}

export const Component = RandomVerbsPage;
