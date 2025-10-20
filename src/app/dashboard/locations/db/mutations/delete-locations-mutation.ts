// import { useSession } from "next-auth/react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosWithoutAuth } from "@/lib/axios";

type useDeleteLocationMutationProps = {
  onSuccess: () => void;
  locationCode: string;
};

export const useDeleteLocationMutation = (
  props: useDeleteLocationMutationProps
) => {
  const { onSuccess, locationCode } = props;

  //   const session = useSession();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      //   if (!session.data) return;

      //   const accessToken = session.data.user.accessToken;
      const json = await axiosWithoutAuth.delete(
        `/v1/locations/${locationCode}`
      );

      return json.data.data;
    },
    onSuccess: () => {
      onSuccess();

      queryClient.invalidateQueries({
        queryKey: ["locations"],
      });
    },
  });
};
