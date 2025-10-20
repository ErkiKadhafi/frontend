"use client";

import React from "react";

import type { TLocation } from "@/config/types";

import ReactTable from "@/components/table/react-table";
import ReactTableError from "@/components/table/react-table-error";
import ReactTableLoading from "@/components/table/react-table-loading";

import { useLocationsQuery } from "../db/hooks/use-locations-query";

import { locationColumnDef } from "./column-def";

export default function DataTable() {
  const [tableData, setTableData] = React.useState<TLocation[]>([]);

  const {
    data: apiResponse,
    isLoading,
    error,
    isFetching,
  } = useLocationsQuery();

  React.useEffect(() => {
    console.log(apiResponse);
    if (apiResponse) setTableData(apiResponse.data);
  }, [apiResponse]);

  if (error) return <ReactTableError message={error.message} />;

  if (isLoading || !apiResponse) return <ReactTableLoading />;

  const { data, ...pagination } = apiResponse;

  return (
    <ReactTable<TLocation>
      tableData={tableData}
      columns={locationColumnDef}
      pagination={pagination}
      isFetching={isFetching}
    />
  );
}
