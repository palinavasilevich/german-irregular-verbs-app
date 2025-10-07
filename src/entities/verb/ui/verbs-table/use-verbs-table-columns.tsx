import { type ColumnDef, type CellContext } from "@tanstack/react-table";
import type { ApiSchemas } from "@/shared/api/schema";
import { Checkbox } from "@/shared/ui/kit/checkbox";
import { VerbsTableColumnHeaderSort } from "./verbs-table-column-header-sort";
import { useVerbStore } from "../../model/store";
import {
  VerbInput,
  type VerbInputRef,
} from "@/features/study-verbs/ui/verb-input/verb-input";
import { useRef } from "react";

type UseVerbsTableColumnsProps = {
  withSelection?: boolean;
  withSorting?: boolean;
  withStudyMode?: boolean;
};

export const HEADERS = [
  { accessorKey: "infinitive", title: "infinitiv" },
  { accessorKey: "past", title: "präteritum" },
  { accessorKey: "participle", title: "perfekt" },
];

export function useVerbsTableColumns({
  withSelection = false,
  withSorting = false,
  withStudyMode = false,
}: UseVerbsTableColumnsProps): ColumnDef<ApiSchemas["Verb"]>[] {
  const { selectedVerbsIds, toggleVerbsId, setSelectedVerbsIds } =
    useVerbStore();

  const rowRefs = useRef<Map<string, VerbInputRef[]>>(new Map());

  if (withStudyMode) {
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

          if (!rowRefs.current.has(rowId)) {
            rowRefs.current.set(rowId, []);
          }

          const refsArray = rowRefs.current.get(rowId)!;

          return (
            <VerbInput
              ref={(el) => {
                refsArray[colIndex] = el!;
              }}
              correctAnswer={String(value)}
              onRequestFocusNext={() => {
                const nextRef = refsArray[colIndex + 1];
                if (nextRef) {
                  nextRef.focus();
                } else {
                  const rows = Array.from(rowRefs.current.keys());
                  const currentIndex = rows.indexOf(rowId);
                  const nextRowId = rows[currentIndex + 1];
                  if (nextRowId) {
                    rowRefs.current.get(nextRowId)?.[0]?.focus();
                  }
                }
              }}
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

  columns.push(
    {
      accessorKey: "infinitive",
      header: ({ column }) => {
        if (withSorting) {
          return (
            <VerbsTableColumnHeaderSort
              column={column}
              title="Infinitive"
              className="md:text-base font-bold capitalize py-2"
            />
          );
        }

        return (
          <span className="md:text-base font-bold capitalize">Infinitive</span>
        );
      },
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
