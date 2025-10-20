import React from "react";

import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { ColumnDef, SortingState } from "@tanstack/react-table";

import { Table as ShadcnTable } from "@/components/ui/table";

import type { TPaginationRes } from "@/config/types";
import { PaginationTableServer } from "./pagination-table-server";
import ReactTableBody from "./react-table-body";
import ReactTableHeader from "./react-table-header";

type ReactTableProps<T> = {
  tableData: T[];
  columns: ColumnDef<T, any>[];
  pagination: TPaginationRes;
  isFetching?: boolean;
};

export default function ReactTable<T>(props: ReactTableProps<T>) {
  const { tableData, columns, pagination, isFetching = false } = props;

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
      <PaginationTableServer
        state="URL"
        table={table}
        pagination={pagination}
        isFetching={isFetching}
      />
    </>
  );
}
