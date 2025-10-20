import { createColumnHelper } from "@tanstack/react-table";

import type { TCumulativeSalary } from "@/config/types";

import { ColumnHeaderDataTable } from "@/components/table/column-header-data-table";
import { formatToKoreanWon } from "@/lib/utils";

const columnHelper = createColumnHelper<TCumulativeSalary>();

export const cumulativeSalaryColumnDef = [
  columnHelper.accessor("departmentCode", {
    header: ({ column }) => (
      <ColumnHeaderDataTable column={column} title="Department Code" />
    ),
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.accessor("empNo", {
    header: ({ column }) => (
      <ColumnHeaderDataTable column={column} title="Employee Number" />
    ),
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.accessor("empName", {
    header: ({ column }) => (
      <ColumnHeaderDataTable column={column} title="Employee Name" />
    ),
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.accessor("cumulativeSalary", {
    header: ({ column }) => (
      <ColumnHeaderDataTable column={column} title="Cumulative Salary" />
    ),
    cell: (info) => <div>{formatToKoreanWon(info.getValue())}</div>,
  }),
];
