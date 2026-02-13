import { useMemo } from "react";
import { type ColumnDef, type CellContext } from "@tanstack/react-table";
import type { ApiSchemas } from "@/shared/api/schema";
import { VerbInput } from "@/features/study-verbs/ui/verb-input/VerbInput";
import { HEADERS } from "./constants";
import { type useFocusInputControl } from "./useFocusInputControl";

type FocusApi = ReturnType<typeof useFocusInputControl>;

export function useTableColumns(
  focusApi: FocusApi,
  onInputComplete?: () => void,
) {
  const { registerInput, focusNext } = focusApi;

  const columns = useMemo<ColumnDef<ApiSchemas["Verb"]>[]>(
    () => [
      ...HEADERS.map(({ accessorKey, title }, colIndex) => ({
        accessorKey,
        header: () => (
          <div className="p-4 text-sm md:text-base font-bold capitalize">
            {title}
          </div>
        ),
        cell: ({ row }: CellContext<ApiSchemas["Verb"], unknown>) => {
          const correctAnswer = String(row.getValue(accessorKey));
          const rowId = row.original.id; // как у тебя было

          return (
            <VerbInput
              ref={(el) => registerInput(rowId, colIndex, el)}
              correctAnswer={correctAnswer}
              id={rowId}
              onRequestFocusNext={() => focusNext(rowId, colIndex)}
              onComplete={onInputComplete}
            />
          );
        },
      })),
      {
        accessorKey: "translation",
        header: () => (
          <span className="md:text-base font-bold capitalize">Übersetzung</span>
        ),
        cell: ({ row }) => (
          <div className="py-4">{row.original.translation}</div>
        ),
      },
    ],
    [registerInput, focusNext, onInputComplete],
  );

  return { columns };
}
