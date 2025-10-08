import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/kit/table";
import { VerbsTableLayout } from "@/entities/verb/ui/verbs-table/verbs-table-layout";

import { useEffect } from "react";
import { useFocusNextInput } from "../../model/use-focus-next-input";

interface StudyVerbsTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  focusApi?: ReturnType<typeof useFocusNextInput>;
}

export function StudyVerbsTable<TData, TValue>({
  columns,
  data,
  focusApi: externalFocusApi,
}: StudyVerbsTableProps<TData, TValue>) {
  const internalFocusApi = useFocusNextInput();
  const focusApi = externalFocusApi ?? internalFocusApi;
  const { focusFirstInput } = focusApi;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (data.length > 0) {
      const t = setTimeout(() => {
        focusFirstInput();
      }, 150);
      return () => clearTimeout(t);
    }
  }, [data.length, focusFirstInput]);

  return (
    <VerbsTableLayout>
      <div className="w-full flex flex-col h-[60dvh]">
        <div className="overflow-hidden rounded-md border flex flex-col">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-background shadow-md">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={table.getAllColumns().length}
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
