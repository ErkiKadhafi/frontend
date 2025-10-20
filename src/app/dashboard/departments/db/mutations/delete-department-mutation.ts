// import { useSession } from "next-auth/react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosWithoutAuth } from "@/lib/axios";

type useDeleteDepartmentMutationProps = {
  onSuccess: () => void;
  departmentCode: string;
};

export const useDeleteDepartmentMutation = (props: useDeleteDepartmentMutationProps) => {
  const { onSuccess, departmentCode } = props;

  //   const session = useSession();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      //   if (!session.data) return;

      //   const accessToken = session.data.user.accessToken;
      const json = await axiosWithoutAuth.delete(
        `/v1/departments/${departmentCode}`
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
