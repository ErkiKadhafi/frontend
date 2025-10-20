// import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { axiosWithoutAuth } from "@/lib/axios";

import type { createTierSchema } from "../../schemas/create-tier-schema";

type useUpdateTierMutationProps = {
  onSuccess: () => void;
  tierCode: number;
};

export const useUpdatTierMutation = (props: useUpdateTierMutationProps) => {
  const { onSuccess, tierCode } = props;
  //   const session = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: z.infer<typeof createTierSchema>) => {
      //   if (!session.data) return;

      //   const accessToken = session.data.user.accessToken;
      const json = await axiosWithoutAuth.put(`/v1/tiers/${tierCode}`, {
        tierName: values.tierName,
      });

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
