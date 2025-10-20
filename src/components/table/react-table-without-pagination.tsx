import React from "react";

import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { ColumnDef, SortingState } from "@tanstack/react-table";

import { Table as ShadcnTable } from "@/components/ui/table";

import ReactTableBody from "./react-table-body";
import ReactTableHeader from "./react-table-header";

type ReactTableProps<T> = {
  tableData: T[];
  columns: ColumnDef<T, any>[];
};

export default function ReactTableWithoutPagination<T>(
  props: ReactTableProps<T>
) {
  const { tableData, columns } = props;

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualFiltering: true,
  });

  return (
    <>
      <ShadcnTable className="border-y">
        <ReactTableHeader table={table} />
        <ReactTableBody table={table} />
      </ShadcnTable>
    </>
  );
}
