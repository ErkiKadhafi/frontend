import { flexRender } from "@tanstack/react-table";
import type { Table } from "@tanstack/react-table";

import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

type ReactTableBodyProps<T> = {
  table: Table<T>;
};

export default function ReactTableHeader<T>(props: ReactTableBodyProps<T>) {
  const { table } = props;

  return (
    <TableHeader>
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
  );
}
