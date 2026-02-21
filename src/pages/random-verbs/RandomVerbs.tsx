import { Loader } from "@/shared/ui/loader/loader";
import { StudyVerbsTable } from "@/features/study-verbs/ui/table/StudyVerbsTable";
import { FeedbackDialog } from "@/features/study-verbs/ui/FeedbackDialog";
import { useRandomStudyVerbs } from "@/features/study-verbs/model/useRandomStudyVerbs";
import { useStudyVerbsFlow } from "@/features/study-verbs/model/useStudyVerbsFlow";
import { PageContent } from "@/app/layout/PageContent";

function RandomVerbsPage() {
  const { studyVerbs, isPending } = useRandomStudyVerbs();
  const { shuffled, columns, focusApi, learnAgain, repeatIncorrect } =
    useStudyVerbsFlow({ verbs: studyVerbs });

  if (isPending) return <Loader />;
  if (!studyVerbs?.length) return null;

  return (
    <PageContent title="Study Verbs">
      <StudyVerbsTable data={shuffled} columns={columns} focusApi={focusApi} />
      <FeedbackDialog
        onLearnVerbsAgain={learnAgain}
        onRepeatIncorrect={repeatIncorrect}
      />
    </PageContent>
  );
}

export const Component = RandomVerbsPage;
