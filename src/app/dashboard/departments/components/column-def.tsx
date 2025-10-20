import { createColumnHelper } from "@tanstack/react-table";

import type { TDepartment } from "@/config/types";

import { ColumnHeaderDataTable } from "@/components/table/column-header-data-table";
import ColumnDefActionButton from "./column-def-action-button";

const columnHelper = createColumnHelper<TDepartment>();

export const departmentColumnDef = [
  columnHelper.accessor("departmentCode", {
    header: ({ column }) => (
      <ColumnHeaderDataTable column={column} title="Department Code" />
    ),
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.accessor("departmentName", {
    header: ({ column }) => (
      <ColumnHeaderDataTable column={column} title="Department Name" />
    ),
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: (info) => <ColumnDefActionButton info={info} />,
  }),
];
