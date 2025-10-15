import { useMemo } from "react";
import { type ColumnDef, type CellContext } from "@tanstack/react-table";
import type { ApiSchemas } from "@/shared/api/schema";
import { VerbInput } from "@/features/study-verbs/ui/verb-input/verb-input";
import { HEADERS } from "./constants";
import { type useFocusInputControl } from "./use-focus-input-control";

type FocusApi = ReturnType<typeof useFocusInputControl>;

export function useTableColumns(focusApi: FocusApi) {
  const { registerInput, focusNext } = focusApi;

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
  }, [registerInput, focusNext]);

  return { columns };
}
