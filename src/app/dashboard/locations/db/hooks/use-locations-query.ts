// import { useSession } from "next-auth/react";

import { AxiosError } from "axios";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { TQueryLocationRes } from "@/config/types";

import { sleep } from "@/lib/utils";
import { axiosWithoutAuth } from "@/lib/axios";

import { useLocationQueryFilter } from "../../hooks/use-location-query-filter";

export const useLocationsQuery = () => {
  const { searchFilter, paginationFilter } = useLocationQueryFilter();

  //   const session = useSession();

  return useQuery<TQueryLocationRes | null, AxiosError>({
    queryKey: ["locations", searchFilter, paginationFilter],
    queryFn: async ({ signal }) => {
      if (searchFilter) await sleep(500);

      //   if (!session.data) return null;

      if (!signal?.aborted) {
        // const accessToken = session.data.user.accessToken;

        const json = await axiosWithoutAuth.get("/v1/locations", {
          params: {
            ...(searchFilter !== "" && {
              locationName: searchFilter,
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
