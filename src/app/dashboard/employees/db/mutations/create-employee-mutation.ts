// import { useSession } from "next-auth/react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { z } from "zod";

import { axiosWithoutAuth } from "@/lib/axios";
import type { createEmployeeSchema } from "../../schemas/create-employee-schema";

type useCreateEmployeeMutationProps = {
  onSuccess: () => void;
};

export const useCreateEmployeeMutation = (
  props: useCreateEmployeeMutationProps
) => {
  const { onSuccess } = props;

  //   const session = useSession();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: z.infer<typeof createEmployeeSchema>) => {
      const data = {
        empNo: values.empNo,
        departmentCode: values.department.departmentCode,
        locationCode: values.location.locationCode,
        tierCode: values.tier.tierCode,
        supervisorCode:
          values.supervisor.empNo !== "" ? values.supervisor.empNo : null,
        empName: values.empName,
        salary: values.salary,
      };
      //   if (!session.data) return;

      //   const accessToken = session.data.user.accessToken;
      const json = await axiosWithoutAuth.post("/v1/employees", data);

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
