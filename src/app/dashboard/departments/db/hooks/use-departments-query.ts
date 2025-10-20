// import { useSession } from "next-auth/react";

import { AxiosError } from "axios";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { TQueryDepartmentRes } from "@/config/types";

import { sleep } from "@/lib/utils";
import { axiosWithoutAuth } from "@/lib/axios";

import { useDepartmentQueryFilter } from "../../hooks/use-department-query-filter";

export const useDepartmentsQuery = () => {
  const { searchFilter, paginationFilter } = useDepartmentQueryFilter();

  //   const session = useSession();

  return useQuery<TQueryDepartmentRes | null, AxiosError>({
    queryKey: ["departments", searchFilter, paginationFilter],
    queryFn: async ({ signal }) => {
      if (searchFilter) await sleep(500);

      //   if (!session.data) return null;

      if (!signal?.aborted) {
        // const accessToken = session.data.user.accessToken;

        const json = await axiosWithoutAuth.get("/v1/departments", {
          params: {
            ...(searchFilter !== "" && {
              departmentName: searchFilter,
            }),
            // ...(USER_ROLES.includes(roleFilter) && {
            //   role: roleFilter,
            // }),
            pageSize: paginationFilter.limit,
            page: paginationFilter.page,
          },
          signal,
        });

        return json.data;
      }
    },
    placeholderData: keepPreviousData,
    // enabled: session.status === "authenticated",
  });
};
