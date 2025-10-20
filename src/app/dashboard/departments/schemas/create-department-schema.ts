import { z } from "zod";

export const createDepartmentSchema = z.object({
  departmentCode: z
    .string({
      error: "Department code is required",
    })
    .min(1, { message: "Department code min 1 letters" })
    .max(2, { message: "Department code max 2 letters" })
    .uppercase(),
  departmentName: z
    .string({
      error: "Department name is required",
    })
    .min(3, { message: "Department name min 3 letters" })
    .max(50, { message: "Department name max 50 letters" }),
});
