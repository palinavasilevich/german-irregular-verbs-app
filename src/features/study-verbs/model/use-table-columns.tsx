import { type ColumnDef, type CellContext } from "@tanstack/react-table";
import type { ApiSchemas } from "@/shared/api/schema";

import {
  VerbInput,
  type VerbInputRef,
} from "@/features/study-verbs/ui/verb-input/verb-input";
import { HEADERS } from "./constants";

type FocusApi = {
  registerInput: (
    rowId: string,
    colIndex: number,
    ref: VerbInputRef | null
  ) => void;
  focusNext: (rowId: string, colIndex: number) => void;
};

type UseTableColumnsProps = {
  focusApi?: FocusApi;
};

export function useTableColumns({
  focusApi,
}: UseTableColumnsProps): ColumnDef<ApiSchemas["Verb"]>[] {
  const registerInput = focusApi?.registerInput;
  const focusNext = focusApi?.focusNext;

  return [
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
}
