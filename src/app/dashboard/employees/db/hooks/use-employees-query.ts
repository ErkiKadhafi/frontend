// import { useSession } from "next-auth/react";

import { AxiosError } from "axios";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { TQueryEmployeeRes } from "@/config/types";

import { sleep } from "@/lib/utils";
import { axiosWithoutAuth } from "@/lib/axios";

import { useEmployeeQueryFilter } from "../../hooks/use-employee-query-filter";

export const useEmployeesQuery = () => {
  const { searchFilter, paginationFilter } = useEmployeeQueryFilter();

  //   const session = useSession();

  return useQuery<TQueryEmployeeRes | null, AxiosError>({
    queryKey: ["employees", searchFilter, paginationFilter],
    queryFn: async ({ signal }) => {
      if (searchFilter) await sleep(500);

      //   if (!session.data) return null;

      if (!signal?.aborted) {
        // const accessToken = session.data.user.accessToken;

        const json = await axiosWithoutAuth.get("/v1/employees", {
          params: {
            ...(searchFilter !== "" && {
              empName: searchFilter,
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
