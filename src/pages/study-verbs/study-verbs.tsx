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
import { Button } from "@/shared/ui/kit/button";
import { RepeatIcon } from "lucide-react";

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

  const { feedbackResults, openDialog, closeDialog, resetFeedbackResults } =
    useDialogContext();

  const [isFeedbackShown, setIsFeedbackShown] = useState(false);
  const [shouldFocus, setShouldFocus] = useState(false);
  const [isLearnVerbsAgainButtonShown, setIsLearnVerbsAgainButtonShown] =
    useState(false);

  const handleLearnVerbsAgain = () => {
    resetInputs();
    setIsFeedbackShown(false);
    resetFeedbackResults();
    setShuffledVerbs(shuffle(verbs || []));
    closeDialog();
    setShouldFocus(true);
    setIsLearnVerbsAgainButtonShown(false);
  };

  const handleRepeatIncorrect = () => {
    const incorrectIds = feedbackResults?.incorrectIds || [];
    if (incorrectIds.length === 0) return;

    const newVerbs = (verbs || []).filter((v) => incorrectIds.includes(v.id));
    setShuffledVerbs(shuffle(newVerbs));
    resetInputs();
    closeDialog();
    setIsFeedbackShown(false);
    setShouldFocus(true);
    setIsLearnVerbsAgainButtonShown(false);
  };

  useEffect(() => {
    if (shouldFocus && shuffledVerbs.length > 0) {
      focusFirstUnfilled();
      setShouldFocus(false);
    }
  }, [shuffledVerbs, focusFirstUnfilled, shouldFocus]);

  useEffect(() => {
    if (isFeedbackShown) return;

    const interval = setInterval(() => {
      if (areAllFilled()) {
        const results = getResults();
        openDialog("feedback", results);
        setIsFeedbackShown(true);
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [areAllFilled, getResults, openDialog, isFeedbackShown]);

  useEffect(() => {
    if (verbs?.length) setShuffledVerbs(shuffle(verbs));
    else setShuffledVerbs([]);
  }, [verbs]);

  useEffect(() => {
    if (shuffledVerbs.length === 0) return;

    const t = setTimeout(() => {
      focusFirstUnfilled();
    }, 100);
    return () => clearTimeout(t);
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
      {isLearnVerbsAgainButtonShown && (
        <div className="flex gap-4 mb-6">
          {feedbackResults && feedbackResults.incorrect > 0 && (
            <Button className="cursor-pointer" onClick={handleRepeatIncorrect}>
              <RepeatIcon />
              Repeat only incorrect verbs
            </Button>
          )}
          <Button className="cursor-pointer" onClick={handleLearnVerbsAgain}>
            <RepeatIcon />
            Learn verbs again
          </Button>
        </div>
      )}

      {content}

      <FeedbackDialog
        onClose={() => {
          focusFirstUnfilled();
          closeDialog();
          setIsLearnVerbsAgainButtonShown(true);
        }}
        onLearnVerbsAgain={handleLearnVerbsAgain}
        onRepeatIncorrect={handleRepeatIncorrect}
      />
    </PageContent>
  );
}

export const Component = StudyVerbsPage;
