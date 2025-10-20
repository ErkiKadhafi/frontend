// import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { axiosWithoutAuth } from "@/lib/axios";

import type { createEmployeeSchema } from "../../schemas/create-employee-schema";

type useUpdateEmployeeMutationProps = {
  onSuccess: () => void;
  empNo: number;
};

export const useUpdatEmployeeMutation = (
  props: useUpdateEmployeeMutationProps
) => {
  const { onSuccess } = props;
  //   const session = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: z.infer<typeof createEmployeeSchema>) => {
      //   if (!session.data) return;

      const data = {
        departmentCode: values.department.departmentCode,
        locationCode: values.location.locationCode,
        tierCode: values.tier.tierCode,
        supervisorCode:
          values.supervisor.empNo !== "" ? values.supervisor.empNo : null,
        empName: values.empName,
        salary: values.salary,
      };

      //   const accessToken = session.data.user.accessToken;
      const { empNo } = values;
      const json = await axiosWithoutAuth.put(`/v1/employees/${empNo}`, data);

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
