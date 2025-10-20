"use client";

import React from "react";

import type { TDepartmentAnalysis } from "@/config/types";

import ReactTableError from "@/components/table/react-table-error";
import ReactTableLoading from "@/components/table/react-table-loading";

import ReactTableWithoutPagination from "@/components/table/react-table-without-pagination";
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { IconFolderCode } from "@tabler/icons-react";
import { useDepartmentAnalysisQuery } from "../db/hooks/use-department-analysis-query";
import { departmentAnalysisColumnDef } from "./department-analysis-column-def ";

type DepartmentAnalysisTableProps = {
  visible: boolean;
};

export default function DepartmentAnalysisTable({
  visible,
}: DepartmentAnalysisTableProps) {
  const [tableData, setTableData] = React.useState<TDepartmentAnalysis[]>([]);

  const { data: apiResponse, isLoading, error } = useDepartmentAnalysisQuery();

  React.useEffect(() => {
    console.log(apiResponse);
    if (apiResponse) setTableData(apiResponse);
  }, [apiResponse]);

  if (error) return <ReactTableError message={error.message} />;

  if (isLoading || !apiResponse) return <ReactTableLoading />;

  if (!visible)
    return (
      <ShadcnTable className="border-y">
        <TableBody>
          <TableRow>
            <TableCell className="text-center" colSpan={4}>
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <IconFolderCode />
                  </EmptyMedia>
                  <EmptyTitle>No Data Yet</EmptyTitle>
                  <EmptyDescription>
                    You haven&apos;t created any data yet. Get started by adding
                    your first data.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            </TableCell>
          </TableRow>
        </TableBody>
      </ShadcnTable>
    );

  return (
    <ReactTableWithoutPagination<TDepartmentAnalysis>
      tableData={tableData}
      columns={departmentAnalysisColumnDef}
    />
  );
}
