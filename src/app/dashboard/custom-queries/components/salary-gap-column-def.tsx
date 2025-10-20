import { createColumnHelper } from "@tanstack/react-table";

import type { TSalaryGap } from "@/config/types";

import { ColumnHeaderDataTable } from "@/components/table/column-header-data-table";
import { formatToKoreanWon } from "@/lib/utils";

const columnHelper = createColumnHelper<TSalaryGap>();

export const salaryGapColumnDef = [
  columnHelper.accessor("locationName", {
    header: ({ column }) => (
      <ColumnHeaderDataTable column={column} title="Location Name" />
    ),
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.accessor("deptName", {
    header: ({ column }) => (
      <ColumnHeaderDataTable column={column} title="Department Name" />
    ),
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.accessor("empName", {
    header: ({ column }) => (
      <ColumnHeaderDataTable column={column} title="Employee Name" />
    ),
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.accessor("tierName", {
    header: ({ column }) => (
      <ColumnHeaderDataTable column={column} title="Position" />
    ),
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.accessor("salary", {
    header: ({ column }) => (
      <ColumnHeaderDataTable column={column} title="Salary" />
    ),
    cell: (info) => <div>{formatToKoreanWon(info.getValue())}</div>,
  }),
  columnHelper.accessor("rank", {
    header: ({ column }) => (
      <ColumnHeaderDataTable column={column} title="Rank" />
    ),
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.accessor("salaryGap", {
    header: ({ column }) => (
      <ColumnHeaderDataTable column={column} title="Salary Gap" />
    ),
    cell: (info) => <div>{formatToKoreanWon(info.getValue())}</div>,
  }),
];
