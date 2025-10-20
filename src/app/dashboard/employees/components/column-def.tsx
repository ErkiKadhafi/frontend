import { createColumnHelper } from "@tanstack/react-table";

import type { TEmployee } from "@/config/types";

import { ColumnHeaderDataTable } from "@/components/table/column-header-data-table";
import ColumnDefActionButton from "./column-def-action-button";
import { Badge } from "@/components/ui/badge";
import { formatToKoreanWon } from "@/lib/utils";

const columnHelper = createColumnHelper<TEmployee>();

export const employeeColumnDef = [
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
  columnHelper.accessor("supervisor.empName", {
    header: ({ column }) => (
      <ColumnHeaderDataTable column={column} title="Supervisor" />
    ),
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.accessor("salary", {
    header: ({ column }) => (
      <ColumnHeaderDataTable column={column} title="Salary" />
    ),
    cell: (info) => <div>{formatToKoreanWon(info.getValue())}</div>,
  }),
  columnHelper.accessor("tier.tierName", {
    header: ({ column }) => (
      <ColumnHeaderDataTable column={column} title="Tier Name" />
    ),
    cell: (info) => <Badge variant={"outline"}>{info.getValue()}</Badge>,
  }),
  columnHelper.accessor("department.departmentName", {
    header: ({ column }) => (
      <ColumnHeaderDataTable column={column} title="Department Name" />
    ),
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.accessor("location.locationName", {
    header: ({ column }) => (
      <ColumnHeaderDataTable column={column} title="Location Name" />
    ),
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: (info) => <ColumnDefActionButton info={info} />,
  }),
];
