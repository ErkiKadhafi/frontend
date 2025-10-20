// import { useSession } from "next-auth/react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosWithoutAuth } from "@/lib/axios";

type useDeleteEmployeeMutationProps = {
  onSuccess: () => void;
  empNo: number;
};

export const useDeleteEmployeeMutation = (
  props: useDeleteEmployeeMutationProps
) => {
  const { onSuccess, empNo } = props;

  //   const session = useSession();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      //   if (!session.data) return;

      //   const accessToken = session.data.user.accessToken;
      const json = await axiosWithoutAuth.delete(`/v1/employees/${empNo}`);

      return json.data.data;
    },
    onSuccess: () => {
      onSuccess();

      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
  });
};
