import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";

import { VerbsTablePagination } from "@/entities/verb/ui/verbs-table/VerbsTablePagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/kit/table";
import { Input } from "@/shared/ui/kit/input";
import { VerbsTableLayout } from "@/entities/verb/ui/verbs-table/VerbsTableLayout";
import { StudyVerbsButton } from "./StudyVerbsButton";
import { useVerbStore } from "@/entities/verb/model/store";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function AllVerbsTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const { selectedVerbsIds, clearSelectedVerbsIds } = useVerbStore();

  React.useEffect(() => {
    clearSelectedVerbsIds();
  }, [clearSelectedVerbsIds]);

  const rowSelection = React.useMemo(
    () => Object.fromEntries(selectedVerbsIds.map((id) => [id, true])),
    [selectedVerbsIds],
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    enableRowSelection: true,
  });

  return (
    <VerbsTableLayout
      header={
        <>
          <Input
            placeholder="Filter infinitive..."
            value={
              (table.getColumn("infinitive")?.getFilterValue() as string) ?? ""
            }
            onChange={(e) =>
              table.getColumn("infinitive")?.setFilterValue(e.target.value)
            }
            className="py-5 max-w-lg bg-background"
          />
          {selectedVerbsIds.length > 0 && <StudyVerbsButton />}
        </>
      }
      footer={
        <VerbsTablePagination
          table={table}
          numberOfSelectedVerbs={selectedVerbsIds.length}
        />
      }
    >
      {/* <div className="w-full flex flex-col h-[60dvh] mb-2"> */}
      <div className="w-full flex flex-col mb-2">
        <div className="overflow-hidden rounded-md border flex flex-col">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-background shadow-2xs">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="bg-background">
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </VerbsTableLayout>
  );
}
