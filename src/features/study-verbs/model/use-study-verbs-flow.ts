import { useEffect, useState, useCallback, useMemo } from "react";
import { shuffle } from "@/shared/lib/array";
import { useDialogContext } from "@/app/context/dialog-context";
import { useFocusInputControl } from "./use-focus-input-control";
import { useTableColumns } from "./use-table-columns";
import { HEADERS } from "./constants";
import type { ApiSchemas } from "@/shared/api/schema";

type UseStudyVerbsFlowProps = {
  verbs: ApiSchemas["Verb"][] | undefined;
};

export function useStudyVerbsFlow({ verbs }: UseStudyVerbsFlowProps) {
  const [shuffled, setShuffled] = useState<ApiSchemas["Verb"][]>([]);
  const [isFeedbackShown, setIsFeedbackShown] = useState(false);
  const [shouldFocus, setShouldFocus] = useState(false);
  const [isLearnAgainShown, setIsLearnAgainShown] = useState(false);

  const [completedCount, setCompletedCount] = useState(0);

  const focusApi = useFocusInputControl();
  const { focusFirstUnfilled, getResults, resetInputs } = focusApi;

  const { feedbackResults, openDialog, closeDialog, resetFeedbackResults } =
    useDialogContext();

  const totalInputs = useMemo(
    () => shuffled.length * HEADERS.length,
    [shuffled.length]
  );

  const handleInputComplete = useCallback(() => {
    setCompletedCount((prev) => prev + 1);
  }, []);

  const { columns } = useTableColumns(focusApi, handleInputComplete);

  // shuffle on first load / when verbs change
  useEffect(() => {
    if (verbs?.length) {
      setShuffled(shuffle(verbs));
      setShouldFocus(true);
      setIsFeedbackShown(false);
      setCompletedCount(0);
    } else {
      setShuffled([]);
      setCompletedCount(0);
    }
  }, [verbs]);

  // show feedback dialog
  useEffect(() => {
    if (isFeedbackShown) return;
    if (totalInputs === 0) return;
    if (completedCount < totalInputs) return;

    const results = getResults();
    openDialog("feedback", results);
    setIsFeedbackShown(true);
  }, [completedCount, totalInputs, isFeedbackShown, getResults, openDialog]);

  // focus on first empty
  useEffect(() => {
    if (shouldFocus && shuffled.length > 0) {
      const t = setTimeout(() => {
        focusFirstUnfilled();
        setShouldFocus(false);
      }, 50);
      return () => clearTimeout(t);
    }
  }, [shouldFocus, shuffled, focusFirstUnfilled]);

  const resetRoundCommon = () => {
    resetInputs();
    resetFeedbackResults();
    setIsFeedbackShown(false);
    setCompletedCount(0);
    setShouldFocus(true);
    closeDialog();
  };

  const learnAgain = () => {
    resetRoundCommon();
    setShuffled(shuffle(verbs || []));
  };

  const repeatIncorrect = () => {
    const incorrect = feedbackResults?.incorrectIds || [];
    const next = (verbs || []).filter((v) => incorrect.includes(v.id));

    resetRoundCommon();
    setShuffled(shuffle(next));
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
