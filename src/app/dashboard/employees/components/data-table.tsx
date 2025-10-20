"use client";

import React from "react";

import type { TEmployee } from "@/config/types";

import ReactTable from "@/components/table/react-table";
import ReactTableError from "@/components/table/react-table-error";
import ReactTableLoading from "@/components/table/react-table-loading";

import { useEmployeesQuery } from "../db/hooks/use-employees-query";

import { employeeColumnDef } from "./column-def";

export default function DataTable() {
  const [tableData, setTableData] = React.useState<TEmployee[]>([]);

  const {
    data: apiResponse,
    isLoading,
    error,
    isFetching,
  } = useEmployeesQuery();

  React.useEffect(() => {
    console.log(apiResponse);
    if (apiResponse) setTableData(apiResponse.data);
  }, [apiResponse]);

  if (error) return <ReactTableError message={error.message} />;

  if (isLoading || !apiResponse) return <ReactTableLoading />;

  const { data, ...pagination } = apiResponse;

  return (
    <ReactTable<TEmployee>
      tableData={tableData}
      columns={employeeColumnDef}
      pagination={pagination}
      isFetching={isFetching}
    />
  );
}
