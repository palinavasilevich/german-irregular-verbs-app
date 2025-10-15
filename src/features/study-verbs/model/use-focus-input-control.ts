import { useCallback, useRef } from "react";
import type { VerbInputRef } from "../ui/verb-input/verb-input";

export function useFocusInputControl() {
  const inputsRef = useRef<Record<string, Array<VerbInputRef | undefined>>>({});

  const registerInput = useCallback(
    (rowId: string, colIndex: number, ref: VerbInputRef | null) => {
      if (!inputsRef.current[rowId]) inputsRef.current[rowId] = [];
      inputsRef.current[rowId][colIndex] = ref ?? undefined;
    },
    []
  );

  const focusFirstUnfilled = useCallback(() => {
    for (const row of Object.values(inputsRef.current)) {
      const firstUnfilled = row.find(
        (input) => input && !input.isAnsweredCorrectly && input.attemptsLeft > 0
      );
      if (firstUnfilled) {
        firstUnfilled.focus();
        return;
      }
    }
    const firstRow = Object.values(inputsRef.current)[0];
    firstRow?.[0]?.focus();
  }, []);

  const focusNext = useCallback(
    (rowId: string, colIndex: number) => {
      const rowIds = Object.keys(inputsRef.current);
      const rowIndex = rowIds.indexOf(rowId);
      if (rowIndex === -1) return;

      const currentRow = inputsRef.current[rowId];
      for (let i = colIndex + 1; i < currentRow.length; i++) {
        const input = currentRow[i];
        if (input && !input.isAnsweredCorrectly && input.attemptsLeft > 0) {
          input.focus();
          return;
        }
      }

      for (let r = rowIndex + 1; r < rowIds.length; r++) {
        const nextRow = inputsRef.current[rowIds[r]];
        const firstUnfilled = nextRow.find(
          (input) =>
            input && !input.isAnsweredCorrectly && input.attemptsLeft > 0
        );
        if (firstUnfilled) {
          firstUnfilled.focus();
          return;
        }
      }

      focusFirstUnfilled();
    },
    [focusFirstUnfilled]
  );

  const getResults = useCallback(() => {
    let correct = 0;
    let incorrect = 0;
    for (const row of Object.values(inputsRef.current)) {
      for (const input of row) {
        if (!input) continue;
        if (input.isAnsweredCorrectly) correct++;
        else if (input.attemptsLeft <= 0) incorrect++;
      }
    }
    return { correct, incorrect };
  }, []);

  const areAllFilled = useCallback((): boolean => {
    return Object.values(inputsRef.current).every((row) =>
      row.every(
        (input) =>
          input && (input.isAnsweredCorrectly || input.attemptsLeft <= 0)
      )
    );
  }, []);

  const resetInputs = useCallback(() => {
    for (const row of Object.values(inputsRef.current)) {
      for (const input of row) {
        input?.reset?.();
      }
    }
  }, []);

  return {
    registerInput,
    focusNext,
    focusFirstUnfilled,
    areAllFilled,
    getResults,
    resetInputs,
  };
}
