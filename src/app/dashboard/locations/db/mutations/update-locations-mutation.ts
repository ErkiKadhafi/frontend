// import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { axiosWithoutAuth } from "@/lib/axios";

import type { createLocationSchema } from "../../schemas/create-location-schema";

type useUpdateLocationMutationProps = {
  onSuccess: () => void;
  locationCode: string;
};

export const useUpdatLocationMutation = (props: useUpdateLocationMutationProps) => {
  const { onSuccess, locationCode } = props;
  //   const session = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: z.infer<typeof createLocationSchema>) => {
      //   if (!session.data) return;

      //   const accessToken = session.data.user.accessToken;
      const json = await axiosWithoutAuth.put(`/v1/locations/${locationCode}`, {
        locationName: values.locationName,
        locationAddress: values.locationAddress,
      });

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
