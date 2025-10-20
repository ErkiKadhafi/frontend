"use client";

import { flexRender } from "@tanstack/react-table";
import type { Row } from "@tanstack/react-table";

import { TableCell, TableRow } from "@/components/ui/table";

type ReactTableBodyProps<T> = {
  row: Row<T>;
};

export default function ReactTableRow<T>(props: ReactTableBodyProps<T>) {
  const { row } = props;

  return (
    <TableRow>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}
