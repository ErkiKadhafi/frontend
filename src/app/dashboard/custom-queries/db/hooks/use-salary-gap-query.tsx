// import { useSession } from "next-auth/react";

import { AxiosError } from "axios";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { TSalaryGap } from "@/config/types";

import { axiosWithoutAuth } from "@/lib/axios";

export const useSalaryGapQuery = () => {
  return useQuery<TSalaryGap[] | null, AxiosError>({
    queryKey: ["salary-gap"],
    queryFn: async ({ signal }) => {
      //   if (searchFilter) await sleep(500);

      //   if (!session.data) return null;

      if (!signal?.aborted) {
        // const accessToken = session.data.user.accessToken;

        const json = await axiosWithoutAuth.get("/v1/employees/salary-gap", {
          signal,
        });

        return json.data;
      }
    },
    placeholderData: keepPreviousData,
    // enabled: session.status === "authenticated",
  });
};
