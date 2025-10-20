import { createColumnHelper } from "@tanstack/react-table";

import type { TTier } from "@/config/types";

import { ColumnHeaderDataTable } from "@/components/table/column-header-data-table";
import ColumnDefActionButton from "./column-def-action-button";

const columnHelper = createColumnHelper<TTier>();

export const tierColumnDef = [
  columnHelper.accessor("tierCode", {
    header: ({ column }) => (
      <ColumnHeaderDataTable column={column} title="Tier Code" />
    ),
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.accessor("tierName", {
    header: ({ column }) => (
      <ColumnHeaderDataTable column={column} title="Tier Name" />
    ),
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: (info) => <ColumnDefActionButton info={info} />,
  }),
];
