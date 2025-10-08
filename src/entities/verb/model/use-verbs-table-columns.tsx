import { type ColumnDef, type CellContext } from "@tanstack/react-table";
import type { ApiSchemas } from "@/shared/api/schema";
import { Checkbox } from "@/shared/ui/kit/checkbox";
import {
  VerbInput,
  type VerbInputRef,
} from "@/features/study-verbs/ui/verb-input/verb-input";
import { useVerbStore } from "./store";
import { HEADERS } from "./constants";
import { VerbsTableColumnHeaderSort } from "../ui/verbs-table/verbs-table-column-header-sort";

type FocusApi = {
  registerInput: (
    rowId: string,
    colIndex: number,
    ref: VerbInputRef | null
  ) => void;
  focusNext: (rowId: string, colIndex: number) => void;
};

type UseVerbsTableColumnsProps = {
  withSelection?: boolean;
  withSorting?: boolean;
  withStudyMode?: boolean;
  focusApi?: FocusApi;
};

export function useVerbsTableColumns({
  withSelection = false,
  withSorting = false,
  withStudyMode = false,
  focusApi,
}: UseVerbsTableColumnsProps): ColumnDef<ApiSchemas["Verb"]>[] {
  const { selectedVerbsIds, toggleVerbsId, setSelectedVerbsIds } =
    useVerbStore();

  if (withStudyMode) {
    const registerInput = focusApi?.registerInput;
    const focusNext = focusApi?.focusNext;

    return [
      ...HEADERS.map(({ accessorKey, title }, colIndex) => ({
        accessorKey,
        header: () => (
          <div className="text-sm md:text-base font-bold capitalize">
            {title}
          </div>
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
        cell: ({ row }) => (
          <div className="py-2">{row.original.translation}</div>
        ),
      },
    ];
  }

  const columns: ColumnDef<ApiSchemas["Verb"]>[] = [];

  if (withSelection) {
    columns.push({
      id: "select",
      header: ({ table }) => {
        const allIds = table.getRowModel().rows.map((r) => r.original.id);
        const allSelected = allIds.every((id) => selectedVerbsIds.includes(id));

        return (
          <Checkbox
            checked={allSelected}
            onCheckedChange={(checked) => {
              if (checked)
                setSelectedVerbsIds([
                  ...new Set([...selectedVerbsIds, ...allIds]),
                ]);
              else
                setSelectedVerbsIds(
                  selectedVerbsIds.filter((id) => !allIds.includes(id))
                );
            }}
            aria-label="Select all"
          />
        );
      },
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <Checkbox
            checked={selectedVerbsIds.includes(id)}
            onCheckedChange={() => toggleVerbsId(id)}
            aria-label="Select row"
          />
        );
      },
      enableSorting: false,
      enableHiding: false,
    });
  }

  // Default view (no study mode)
  columns.push(
    {
      accessorKey: "infinitive",
      header: ({ column }) =>
        withSorting ? (
          <VerbsTableColumnHeaderSort
            column={column}
            title="Infinitive"
            className="md:text-base font-bold capitalize py-2"
          />
        ) : (
          <span className="md:text-base font-bold capitalize">Infinitive</span>
        ),
      cell: ({ row }) => <div className="py-2">{row.original.infinitive}</div>,
    },
    {
      accessorKey: "past",
      header: () => (
        <span className="md:text-base font-bold capitalize">Präteritum</span>
      ),
      cell: ({ row }) => <div className="py-2">{row.original.past}</div>,
    },
    {
      accessorKey: "participle",
      header: () => (
        <span className="md:text-base font-bold capitalize">Perfekt</span>
      ),
      cell: ({ row }) => <div className="py-2">{row.original.participle}</div>,
    },
    {
      accessorKey: "translation",
      header: () => (
        <span className="md:text-base font-bold capitalize">Übersetzung</span>
      ),
      cell: ({ row }) => <div className="py-2">{row.original.translation}</div>,
    }
  );

  return columns;
}
