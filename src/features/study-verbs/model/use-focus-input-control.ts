import { useCallback, useRef } from "react";
import { type VerbInputRef } from "../ui/verb-input/verb-input";

export function useFocusInputControl() {
  const inputsRef = useRef<Record<string, VerbInputRef[]>>({});

  const registerInput = (
    rowId: string,
    colIndex: number,
    ref: VerbInputRef | null
  ) => {
    if (!ref) return;
    if (!inputsRef.current[rowId]) {
      inputsRef.current[rowId] = [];
    }
    inputsRef.current[rowId][colIndex] = ref;

    console.log(Object.values(inputsRef.current));
  };

  const focusFirstInput = () => {
    const firstRow = Object.values(inputsRef.current)[0];
    if (!firstRow) return;
    const firstInput = firstRow[0];
    firstInput?.focus();
  };

  const focusFirstUnfilled = () => {
    for (const row of Object.values(inputsRef.current)) {
      const firstUnfilled = row.find(
        (input) => input && !input.isAnsweredCorrectly && input.attemptsLeft > 0
      );
      if (firstUnfilled) {
        firstUnfilled.focus();
        return;
      }
    }
  };

  const focusNext = (rowId: string, colIndex: number) => {
    const rows = Object.keys(inputsRef.current);
    const rowIndex = rows.indexOf(rowId);
    if (rowIndex === -1) return;

    const currentRowInputs = inputsRef.current[rowId];
    const nextColIndex = colIndex + 1;

    for (let i = nextColIndex; i < currentRowInputs.length; i++) {
      const input = currentRowInputs[i];
      if (input && !input.isAnsweredCorrectly && input.attemptsLeft > 0) {
        input.focus();
        return;
      }
    }

    for (let r = rowIndex + 1; r < rows.length; r++) {
      const nextRow = inputsRef.current[rows[r]];
      const firstUnfilled = nextRow.find(
        (input) => input && !input.isAnsweredCorrectly && input.attemptsLeft > 0
      );
      if (firstUnfilled) {
        firstUnfilled.focus();
        return;
      }
    }

    focusFirstUnfilled();
  };

  const areAllFilled = useCallback(() => {
    for (const row of Object.values(inputsRef.current)) {
      console.log(row);
    }
  }, []);

  //   const areAllFilled = useCallback(() => {
  //   return inputsRef.current.every(
  //     (input) => input.ref && input.ref.value.trim() !== ""
  //   );
  // }, []);

  return {
    registerInput,
    focusNext,
    focusFirstInput,
    focusFirstUnfilled,
    areAllFilled,
  };
}
