// import { useSession } from "next-auth/react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { z } from "zod";

import { axiosWithoutAuth } from "@/lib/axios";
import type { createTierSchema } from "../../schemas/create-tier-schema";

type useCreateTierMutationProps = {
  onSuccess: () => void;
};

export const useCreateTiertmentMutation = (
  props: useCreateTierMutationProps
) => {
  const { onSuccess } = props;

  //   const session = useSession();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: z.infer<typeof createTierSchema>) => {
      //   if (!session.data) return;

      //   const accessToken = session.data.user.accessToken;
      const json = await axiosWithoutAuth.post("/v1/tiers", values);

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
