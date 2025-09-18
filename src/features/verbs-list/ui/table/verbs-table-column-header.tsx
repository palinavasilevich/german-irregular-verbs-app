import { cn } from "@/shared/lib/css";
import { Button } from "@/shared/ui/kit/button";
import { FaSortAlphaDown, FaSortAlphaUp, FaSort } from "react-icons/fa";

import type { Column } from "@tanstack/react-table";

interface VerbsTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}
export function VerbsTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: VerbsTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }
  const sorted = column.getIsSorted();

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        variant="ghost"
        className="text-sm md:text-base font-bold capitalize !p-0 m-0 hover:bg-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
        onPointerDown={(e) => {
          e.preventDefault();
          column.toggleSorting(sorted === "asc");
        }}
      >
        {title}
        {!sorted && <FaSort />}
        {sorted === "asc" && <FaSortAlphaDown />}
        {sorted === "desc" && <FaSortAlphaUp />}
      </Button>
    </div>
  );
}
