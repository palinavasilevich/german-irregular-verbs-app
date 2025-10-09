import { type ColumnDef, type CellContext } from "@tanstack/react-table";
import type { ApiSchemas } from "@/shared/api/schema";

import {
  VerbInput,
  // type VerbInputRef,
} from "@/features/study-verbs/ui/verb-input/verb-input";
import { HEADERS } from "./constants";
import { useFocusInputControl } from "./use-focus-input-control";

export function useTableColumns() {
  const {
    registerInput,
    focusNext,
    focusFirstInput,
    focusFirstUnfilled,
    areAllFilled,
  } = useFocusInputControl();

  const columns: ColumnDef<ApiSchemas["Verb"]>[] = [
    ...HEADERS.map(({ accessorKey, title }, colIndex) => ({
      accessorKey,
      header: () => (
        <div className="text-sm md:text-base font-bold capitalize">{title}</div>
      ),
      cell: ({ row }: CellContext<ApiSchemas["Verb"], unknown>) => {
        const value = row.getValue(accessorKey);
        const rowId = row.original.id;

        return (
          <VerbInput
            ref={(el) => registerInput?.(rowId, colIndex, el)}
            correctAnswer={String(value)}
            onRequestFocusNext={() => focusNext?.(rowId, colIndex)}
          />
        );
      },
    })),
    {
      accessorKey: "translation",
      header: () => (
        <span className="md:text-base font-bold capitalize">Übersetzung</span>
      ),
      cell: ({ row }) => <div className="py-2">{row.original.translation}</div>,
    },
  ];

  return { columns, focusFirstInput, focusFirstUnfilled, areAllFilled };
}
