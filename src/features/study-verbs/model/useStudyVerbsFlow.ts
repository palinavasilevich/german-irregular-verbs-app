import { useEffect, useState, useCallback, useMemo } from "react";
import { shuffle } from "@/shared/lib/array";
import { useDialogContext } from "@/app/context/DialogContext";
import { useFocusInputControl } from "./useFocusInputControl";
import { useTableColumns } from "./useTableColumns";
import { HEADERS } from "./constants";
import type { ApiSchemas } from "@/shared/api/schema";

type UseStudyVerbsFlowProps = {
  verbs: ApiSchemas["Verb"][] | undefined;
};

export function useStudyVerbsFlow({ verbs }: UseStudyVerbsFlowProps) {
  const [shuffled, setShuffled] = useState<ApiSchemas["Verb"][]>([]);
  const [shouldFocus, setShouldFocus] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  const [isRoundFinished, setIsRoundFinished] = useState(false);

  const focusApi = useFocusInputControl();
  const { focusFirstUnfilled, getResults, resetInputs } = focusApi;

  const { dialog, openFeedbackDialog, closeDialog } = useDialogContext();

  const totalInputs = useMemo(
    () => shuffled.length * HEADERS.length,
    [shuffled.length],
  );

  const handleInputComplete = useCallback(() => {
    setCompletedCount((prev) => prev + 1);
  }, []);

  const { columns } = useTableColumns(focusApi, handleInputComplete);

  useEffect(() => {
    if (verbs?.length) {
      setShuffled(shuffle(verbs));
      setShouldFocus(true);
      setCompletedCount(0);
    } else {
      setShuffled([]);
      setCompletedCount(0);
    }
  }, [verbs]);

  useEffect(() => {
    if (totalInputs === 0) return;
    if (completedCount !== totalInputs) return;
    if (isRoundFinished) return;

    const results = getResults();
    openFeedbackDialog(results);
    setIsRoundFinished(true);
  }, [
    completedCount,
    totalInputs,
    isRoundFinished,
    getResults,
    openFeedbackDialog,
  ]);

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
    setCompletedCount(0);
    setShouldFocus(true);
    setIsRoundFinished(false);
    closeDialog();
  };

  const learnAgain = () => {
    resetRoundCommon();
    setShuffled(shuffle(verbs || []));
  };

  const repeatIncorrect = () => {
    if (!dialog || dialog.type !== "feedback") return;

    const incorrectIds = dialog.data.incorrectIds;
    const next = (verbs || []).filter((v) => incorrectIds.includes(v.id));

    resetRoundCommon();
    setShuffled(shuffle(next));
  };

  return {
    shuffled,
    columns,
    focusApi,
    learnAgain,
    repeatIncorrect,
  };
}
