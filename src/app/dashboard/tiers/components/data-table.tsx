"use client";

import React from "react";

import type { TTier } from "@/config/types";

import ReactTable from "@/components/table/react-table";
import ReactTableError from "@/components/table/react-table-error";
import ReactTableLoading from "@/components/table/react-table-loading";

import { useTiersQuery } from "../db/hooks/use-tiers-query";

import { tierColumnDef } from "./column-def";

export default function DataTable() {
  const [tableData, setTableData] = React.useState<TTier[]>([]);

  const { data: apiResponse, isLoading, error, isFetching } = useTiersQuery();

  React.useEffect(() => {
    console.log(apiResponse);
    if (apiResponse) setTableData(apiResponse.data);
  }, [apiResponse]);

  if (error) return <ReactTableError message={error.message} />;

  if (isLoading || !apiResponse) return <ReactTableLoading />;

  const { data, ...pagination } = apiResponse;

  return (
    <ReactTable<TTier>
      tableData={tableData}
      columns={tierColumnDef}
      pagination={pagination}
      isFetching={isFetching}
    />
  );
}
