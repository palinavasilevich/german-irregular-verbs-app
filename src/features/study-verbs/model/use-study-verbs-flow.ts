import { useEffect, useState } from "react";
import { shuffle } from "@/shared/lib/array";
import { useDialogContext } from "@/app/context/dialog-context";
import { useFocusInputControl } from "./use-focus-input-control";
import { useTableColumns } from "./use-table-columns";
import type { ApiSchemas } from "@/shared/api/schema";

type UseStudyVerbsFlowProps = {
  verbs: ApiSchemas["Verb"][] | undefined;
};

export function useStudyVerbsFlow({ verbs }: UseStudyVerbsFlowProps) {
  const [shuffled, setShuffled] = useState<ApiSchemas["Verb"][]>([]);
  const [isFeedbackShown, setIsFeedbackShown] = useState(false);
  const [shouldFocus, setShouldFocus] = useState(false);
  const [isLearnAgainShown, setIsLearnAgainShown] = useState(false);

  const focusApi = useFocusInputControl();
  const { columns } = useTableColumns(focusApi);
  const { focusFirstUnfilled, areAllFilled, getResults, resetInputs } =
    focusApi;

  const { feedbackResults, openDialog, closeDialog, resetFeedbackResults } =
    useDialogContext();

  // shuffle on first load
  useEffect(() => {
    if (verbs?.length) {
      setShuffled(shuffle(verbs));
      setShouldFocus(true);
      setIsFeedbackShown(false);
    } else {
      setShuffled([]);
    }
  }, [verbs]);

  // auto-check finished inputs
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

  // focus on first empty
  //   useEffect(() => {
  //     if (shouldFocus && shuffled.length > 0) {
  //       focusFirstUnfilled();
  //       setShouldFocus(false);
  //     }
  //   }, [shuffled, focusFirstUnfilled, shouldFocus]);

  useEffect(() => {
    if (shouldFocus && shuffled.length > 0) {
      const t = setTimeout(() => {
        focusFirstUnfilled();
        setShouldFocus(false);
      }, 50);
      return () => clearTimeout(t);
    }
  }, [shouldFocus, shuffled, focusFirstUnfilled]);

  const learnAgain = () => {
    resetInputs();
    resetFeedbackResults();
    setIsFeedbackShown(false);
    setShuffled(shuffle(verbs || []));
    setShouldFocus(true);
    closeDialog();
  };

  const repeatIncorrect = () => {
    const incorrect = feedbackResults?.incorrectIds || [];
    const next = (verbs || []).filter((v) => incorrect.includes(v.id));

    resetInputs();
    resetFeedbackResults();
    setIsFeedbackShown(false);
    setShuffled(shuffle(next));
    setShouldFocus(true);
    closeDialog();
  };

  return {
    shuffled,
    columns,
    focusApi,
    feedbackResults,
    isLearnAgainShown,
    learnAgain,
    repeatIncorrect,
    setIsLearnAgainShown,
  };
}
