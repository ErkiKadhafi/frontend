import { createColumnHelper } from "@tanstack/react-table";

import type { TDepartmentAnalysis } from "@/config/types";

import { ColumnHeaderDataTable } from "@/components/table/column-header-data-table";
import { formatToKoreanWon } from "@/lib/utils";

const columnHelper = createColumnHelper<TDepartmentAnalysis>();

export const departmentAnalysisColumnDef = [
  columnHelper.accessor("locationName", {
    header: ({ column }) => (
      <ColumnHeaderDataTable column={column} title="Location Name" />
    ),
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.accessor("deptWithMostEmployees", {
    header: ({ column }) => (
      <ColumnHeaderDataTable column={column} title="Dept with Most Employees" />
    ),
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.accessor("deptEmployeeCount", {
    header: ({ column }) => (
      <ColumnHeaderDataTable column={column} title="Dept Employee Count" />
    ),
    cell: (info) => <div>{info.getValue()}</div>,
  }),
  columnHelper.accessor("avgSalaryOfLowestDep", {
    header: ({ column }) => (
      <ColumnHeaderDataTable column={column} title="Average Salary of Lowest" />
    ),
    cell: (info) => <div>{formatToKoreanWon(info.getValue())}</div>,
  }),
];
