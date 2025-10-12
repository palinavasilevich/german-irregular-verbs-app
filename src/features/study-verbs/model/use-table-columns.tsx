import { type ColumnDef, type CellContext } from "@tanstack/react-table";
import type { ApiSchemas } from "@/shared/api/schema";
import { VerbInput } from "@/features/study-verbs/ui/verb-input/verb-input";
import { HEADERS } from "./constants";
import { type useFocusInputControl } from "./use-focus-input-control";
import { useDialogContext } from "@/app/context/dialog-context";
import { useMemo } from "react";

type FocusApi = ReturnType<typeof useFocusInputControl>;

export function useTableColumns(focusApi: FocusApi) {
  const { registerInput, focusNext, areAllFilled, getResults } = focusApi;

  const { openDialog } = useDialogContext();

  const columns = useMemo<ColumnDef<ApiSchemas["Verb"]>[]>(() => {
    return [
      ...HEADERS.map(({ accessorKey, title }, colIndex) => ({
        accessorKey,
        header: () => (
          <div className="text-sm md:text-base font-bold capitalize">
            {title}
          </div>
        ),
        cell: ({ row }: CellContext<ApiSchemas["Verb"], unknown>) => {
          const correctAnswer = String(row.getValue(accessorKey));
          const rowId = row.original.id;

          return (
            <VerbInput
              ref={(el) => registerInput(rowId, colIndex, el)}
              correctAnswer={correctAnswer}
              onAnswer={() => {
                if (areAllFilled()) {
                  const results = getResults();
                  openDialog("feedback", results);
                }
              }}
              onRequestFocusNext={() => focusNext(rowId, colIndex)}
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
          <div className="py-2">{row.original.translation}</div>
        ),
      },
    ];
  }, [registerInput, focusNext, areAllFilled, getResults, openDialog]);

  return { columns };
}
