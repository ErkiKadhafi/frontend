import { z } from "zod";

export const updateDepartmentSchema = z.object({
  departmentName: z
    .string({
      error: "Department name is required",
    })
    .min(3, { message: "Department name min 3 letters" })
    .max(50, { message: "Department name max 50 letters" }),
});
