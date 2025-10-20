"use client";

import React from "react";

import type { TDepartment } from "@/config/types";

import ReactTable from "@/components/table/react-table";
import ReactTableError from "@/components/table/react-table-error";
import ReactTableLoading from "@/components/table/react-table-loading";

import { useDepartmentsQuery } from "../db/hooks/use-departments-query";

import { departmentColumnDef } from "./column-def";

export default function DataTable() {
  const [tableData, setTableData] = React.useState<TDepartment[]>([]);

  const {
    data: apiResponse,
    isLoading,
    error,
    isFetching,
  } = useDepartmentsQuery();

  React.useEffect(() => {
    console.log(apiResponse);
    if (apiResponse) setTableData(apiResponse.data);
  }, [apiResponse]);

  if (error) return <ReactTableError message={error.message} />;

  if (isLoading || !apiResponse) return <ReactTableLoading />;

  const { data, ...pagination } = apiResponse;

  return (
    <ReactTable<TDepartment>
      tableData={tableData}
      columns={departmentColumnDef}
      pagination={pagination}
      isFetching={isFetching}
    />
  );
}
