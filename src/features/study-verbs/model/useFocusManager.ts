import { useCallback, useRef } from "react";
import type { VerbInputRef } from "@/features/study-verbs/ui/verb-input/verb-input";

type FocusEntry = {
  ref: VerbInputRef | null;
  rowId: string;
  colIndex: number;
};

export function useFocusManager() {
  const inputsRef = useRef<FocusEntry[]>([]);

  const registerInput = useCallback(
    (rowId: string, colIndex: number, ref: VerbInputRef | null) => {
      const existingIndex = inputsRef.current.findIndex(
        (i) => i.rowId === rowId && i.colIndex === colIndex
      );

      if (existingIndex >= 0) {
        inputsRef.current[existingIndex].ref = ref;
      } else {
        inputsRef.current.push({ rowId, colIndex, ref });
        // сортируем, чтобы порядок всегда соответствовал таблице
        inputsRef.current.sort((a, b) =>
          a.rowId === b.rowId
            ? a.colIndex - b.colIndex
            : a.rowId.localeCompare(b.rowId)
        );
      }
    },
    []
  );

  const focusFirstInput = useCallback(() => {
    inputsRef.current[0]?.ref?.focus();
  }, []);

  const focusNext = useCallback((rowId: string, colIndex: number) => {
    const index = inputsRef.current.findIndex(
      (i) => i.rowId === rowId && i.colIndex === colIndex
    );
    if (index >= 0 && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].ref?.focus();
    }
  }, []);

  const focusFirstUnfilledOrFirst = useCallback(() => {
    const next = inputsRef.current.find(
      (i) => !i.ref?.isAnsweredCorrectly && i.ref?.attemptsLeft! > 0
    );
    if (next) next.ref?.focus();
    else focusFirstInput(); // если все заполнены, фокус на первый
  }, [focusFirstInput]);

  const areAllFilled = useCallback(() => {
    return inputsRef.current.every(
      (i) => i.ref?.isAnsweredCorrectly || i.ref?.attemptsLeft! <= 0
    );
  }, []);

  return {
    registerInput,
    focusFirstInput,
    focusFirstUnfilledOrFirst,
    focusNext,
    areAllFilled,
  };
}
