// import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { axiosWithoutAuth } from "@/lib/axios";

import type { createDepartmentSchema } from "../../schemas/create-department-schema";

type useUpdateDepartmentMutationProps = {
  onSuccess: () => void;
  departmentCode: string;
};

export const useUpdatDepartmentMutation = (
  props: useUpdateDepartmentMutationProps
) => {
  const { onSuccess, departmentCode } = props;
  //   const session = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: z.infer<typeof createDepartmentSchema>) => {
      //   if (!session.data) return;

      //   const accessToken = session.data.user.accessToken;
      const json = await axiosWithoutAuth.put(
        `/v1/departments/${departmentCode}`,
        { departmentName: values.departmentName }
      );

      return json.data.data;
    },
    onSuccess: () => {
      onSuccess();

      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
    },
  });
};
