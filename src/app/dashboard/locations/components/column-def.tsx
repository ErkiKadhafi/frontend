import { createColumnHelper } from "@tanstack/react-table";

import type { TLocation } from "@/config/types";

import { ColumnHeaderDataTable } from "@/components/table/column-header-data-table";
import ColumnDefActionButton from "./column-def-action-button";

const columnHelper = createColumnHelper<TLocation>();

export const locationColumnDef = [
  columnHelper.accessor("locationCode", {
    header: ({ column }) => (
      <ColumnHeaderDataTable column={column} title="Location Code" />
    ),
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.accessor("locationName", {
    header: ({ column }) => (
      <ColumnHeaderDataTable column={column} title="Location Name" />
    ),
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.accessor("locationAddress", {
    header: ({ column }) => (
      <ColumnHeaderDataTable column={column} title="Location Address" />
    ),
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: (info) => <ColumnDefActionButton info={info} />,
  }),
];
