// import { useSession } from "next-auth/react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosWithoutAuth } from "@/lib/axios";

type useDeleteTierMutationProps = {
  onSuccess: () => void;
  tierCode: number;
};

export const useDeleteTierMutation = (props: useDeleteTierMutationProps) => {
  const { onSuccess, tierCode } = props;

  //   const session = useSession();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      //   if (!session.data) return;

      //   const accessToken = session.data.user.accessToken;
      const json = await axiosWithoutAuth.delete(
        `/v1/tiers/${tierCode}`
      );

      return json.data.data;
    },
    onSuccess: () => {
      onSuccess();

      queryClient.invalidateQueries({
        queryKey: ["tiers"],
      });
    },
  });
};
