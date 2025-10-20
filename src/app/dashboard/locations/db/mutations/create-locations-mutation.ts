// import { useSession } from "next-auth/react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { z } from "zod";

import { axiosWithoutAuth } from "@/lib/axios";
import type { createLocationSchema } from "../../schemas/create-location-schema";

type useCreateLocationMutationProps = {
  onSuccess: () => void;
};

export const useCreateLocationMutation = (
  props: useCreateLocationMutationProps
) => {
  const { onSuccess } = props;

  //   const session = useSession();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: z.infer<typeof createLocationSchema>) => {
      //   if (!session.data) return;

      //   const accessToken = session.data.user.accessToken;
      const json = await axiosWithoutAuth.post("/v1/locations", values);

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
