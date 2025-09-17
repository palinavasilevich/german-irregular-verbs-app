"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { ApiSchemas } from "@/shared/api/schema";

export const columns: ColumnDef<ApiSchemas["Verb"]>[] = [
  {
    accessorKey: "infinitive",
    header: "Infinitiv",
  },
  {
    accessorKey: "past",
    header: "Präteritum",
  },
  {
    accessorKey: "participle",
    header: "Perfekt",
  },
  {
    accessorKey: "translation",
    header: "Translation",
  },
];
