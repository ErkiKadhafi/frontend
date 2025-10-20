import type { Table } from "@tanstack/react-table";

import { TableBody } from "@/components/ui/table";

import ReactTableRows from "./react-table-rows";
import ReactTableRowEmpty from "./react-table-row-empty";

type ReactTableBodyProps<T> = {
  table: Table<T>;
};

export default function ReactTableBody<T>(props: ReactTableBodyProps<T>) {
  const { table } = props;

  return (
    <TableBody>
      {table.getRowModel().rows.length === 0 ? (
        <ReactTableRowEmpty table={table} />
      ) : (
        <ReactTableRows table={table} />
      )}
    </TableBody>
  );
}
