import { type ColumnDef } from "@tanstack/react-table";
import type { ApiSchemas } from "@/shared/api/schema";
import { Checkbox } from "@/shared/ui/kit/checkbox";
import { useVerbStore } from "./store";

import { VerbsTableColumnHeaderSort } from "../ui/verbs-table/VerbsTableColumnHeaderSort";

type UseVerbsTableColumnsProps = {
  withSelection?: boolean;
  withSorting?: boolean;
};

export function useVerbsTableColumns({
  withSelection = false,
  withSorting = false,
}: UseVerbsTableColumnsProps): ColumnDef<ApiSchemas["Verb"]>[] {
  const { selectedVerbsIds, toggleVerbsId, setSelectedVerbsIds } =
    useVerbStore();

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
                  selectedVerbsIds.filter((id) => !allIds.includes(id)),
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
      size: 48,
      minSize: 48,
      maxSize: 48,
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
    },
  );

  return columns;
}
