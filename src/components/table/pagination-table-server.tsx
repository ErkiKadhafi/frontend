import React from "react";

import type { Table } from "@tanstack/react-table";

import { parseAsInteger, useQueryStates } from "nuqs";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { TPaginationRes } from "@/config/types";

import { Spinner } from "../ui/spinner";

type UrlState = {
  state: "URL";
};

type ClientState = {
  state: "CLIENT";
  paginationFilterState: {
    limit: number;
    page: number;
  };
  setPaginationFilterState: React.Dispatch<
    React.SetStateAction<{
      limit: number;
      page: number;
    }>
  >;
};

type PaginationTableServerProps<T> = {
  pagination: TPaginationRes;
  table: Table<T>;
  isFetching?: boolean;
} & (UrlState | ClientState);

export function PaginationTableServer<T>(props: PaginationTableServerProps<T>) {
  const { state, pagination, isFetching = false } = props;

  const [paginationFilter, setPaginationFilter] = useQueryStates(
    {
      page: parseAsInteger.withDefault(0),
      limit: parseAsInteger.withDefault(10),
    },
    {
      shallow: false,
      history: "push",
      scroll: false,
    }
  );

  return (
    <div className="mx-4 my-4 flex items-center justify-end">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-gray-500">Rows per page</p>
          <Select
            value={
              state === "URL"
                ? paginationFilter.limit.toString()
                : props.paginationFilterState.limit.toString()
            }
            onValueChange={(value) => {
              state === "URL"
                ? setPaginationFilter(() => ({
                    page: 0,
                    limit: Number(value),
                  }))
                : props.setPaginationFilterState(() => ({
                    page: 0,
                    limit: Number(value),
                  }));
            }}
            disabled={isFetching}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={10} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 25, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm text-gray-500">
          Page {pagination.page + 1} of {pagination.totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() =>
              state === "URL"
                ? setPaginationFilter((old) => ({ ...old, page: 0 }))
                : props.setPaginationFilterState((old) => ({ ...old, page: 0 }))
            }
            disabled={paginationFilter.page === 0 || isFetching}
          >
            {isFetching ? (
              <Spinner className="h-4 w-4" />
            ) : (
              <>
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft className="h-4 w-4" />
              </>
            )}
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() =>
              state === "URL"
                ? setPaginationFilter((old) => ({ ...old, page: old.page - 1 }))
                : props.setPaginationFilterState((old) => ({
                    ...old,
                    page: old.page - 1,
                  }))
            }
            disabled={paginationFilter.page === 0 || isFetching}
          >
            {/* {pagination.hasPrevPage && isFetching ? ( */}
            {false ? (
              <Spinner className="h-4 w-4" />
            ) : (
              <>
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft className="h-4 w-4" />
              </>
            )}
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() =>
              state === "URL"
                ? setPaginationFilter((old) => ({ ...old, page: old.page + 1 }))
                : props.setPaginationFilterState((old) => ({
                    ...old,
                    page: old.page + 1,
                  }))
            }
            disabled={
              pagination.page + 1 >= pagination.totalPages || isFetching
            }
          >
            {isFetching ? (
              <Spinner className="h-4 w-4" />
            ) : (
              <>
                <span className="sr-only">Go to next page</span>
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() =>
              state === "URL"
                ? setPaginationFilter((old) => ({
                    ...old,
                    page: pagination.totalPages,
                  }))
                : props.setPaginationFilterState((old) => ({
                    ...old,
                    page: pagination.totalPages,
                  }))
            }
            disabled={
              pagination.page + 1 >= pagination.totalPages || isFetching
            }
          >
            {isFetching ? (
              <Spinner className="h-4 w-4" />
            ) : (
              <>
                <span className="sr-only">Go to last page</span>
                <ChevronsRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
