"use client";

import { type ColumnDef } from "@tanstack/react-table";
import type { ApiSchemas } from "@/shared/api/schema";
import { Checkbox } from "@/shared/ui/kit/checkbox";
import { VerbsTableColumnHeader } from "./verbs-table-column-header";

export const verbsTableColumns: ColumnDef<ApiSchemas["Verb"]>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "infinitive",
    header: ({ column }) => (
      <VerbsTableColumnHeader column={column} title="Infinitive" />
    ),

    cell: ({ row }) => {
      const verb = row.original;
      return <span>{verb.infinitive}</span>;
    },
  },
  {
    accessorKey: "past",
    header: () => (
      <span className="md:text-base font-bold capitalize">Präteritum</span>
    ),
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "participle",
    header: () => (
      <span className="md:text-base font-bold capitalize">Perfekt</span>
    ),
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "translation",
    header: () => (
      <span className="md:text-base font-bold capitalize">Übersetzung</span>
    ),
    cell: (info) => info.getValue(),
  },
];
