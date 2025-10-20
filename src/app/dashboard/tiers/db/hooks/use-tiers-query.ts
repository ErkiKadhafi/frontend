// import { useSession } from "next-auth/react";

import { AxiosError } from "axios";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { TQueryTierRes } from "@/config/types";

import { sleep } from "@/lib/utils";
import { axiosWithoutAuth } from "@/lib/axios";

import { useDepartmentQueryFilter } from "../../hooks/use-department-query-filter";

export const useTiersQuery = () => {
  const { searchFilter, paginationFilter } = useDepartmentQueryFilter();

  //   const session = useSession();

  return useQuery<TQueryTierRes | null, AxiosError>({
    queryKey: ["tiers", searchFilter, paginationFilter],
    queryFn: async ({ signal }) => {
      if (searchFilter) await sleep(500);

      //   if (!session.data) return null;

      if (!signal?.aborted) {
        // const accessToken = session.data.user.accessToken;

        const json = await axiosWithoutAuth.get("/v1/tiers", {
          params: {
            ...(searchFilter !== "" && {
              tierName: searchFilter,
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
