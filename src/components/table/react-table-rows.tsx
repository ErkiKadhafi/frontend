import type { Table } from "@tanstack/react-table";

import ReactTableRow from "./react-table-row";

type ReactTableBodyProps<T> = {
  table: Table<T>;
};

export default function ReactTableRows<T>(props: ReactTableBodyProps<T>) {
  const { table } = props;

  return (
    <>
      {table.getRowModel().rows.map((row) => (
        <ReactTableRow row={row} key={row.id} />
      ))}
    </>
  );
}
