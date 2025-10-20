import { z } from "zod";

export const createEmployeeSchema = z.object({
  department: z.object({
    departmentCode: z
      .string({
        error: "Department code is required",
      })
      .min(1, { message: "Department code is required" }),
    departmentName: z
      .string({
        error: "Department name is required",
      })
      .min(1, { message: "Department name is required" }),
  }),
  tier: z.object({
    tierCode: z
      .string({
        error: "Tier code is required",
      })
      .min(1, { message: "Tier code is required" }),
    tierName: z
      .string({
        error: "Tier name is required",
      })
      .min(1, { message: "Tier name is required" }),
  }),
  location: z.object({
    locationCode: z
      .string({
        error: "Location code is required",
      })
      .min(1, { message: "Location code is required" }),
    locationName: z
      .string({
        error: "Location name is required",
      })
      .min(1, { message: "Location name is required" }),
  }),
  supervisor: z.object({
    empNo: z.string().optional(),
    empName: z.string().optional(),
  }),
  empNo: z
    .number({
      error: "Employee number is required",
    })
    .min(1, { message: "Employee number min 1 digits" })
    .max(999, { message: "Employee number max 3 digits" }),
  salary: z.number().min(1, { message: "Salary min 1 digits" }),
  empName: z
    .string({
      error: "Employee name is required",
    })
    .min(3, { message: "Employee name min 3 letters" })
    .max(100, { message: "Employee name max 100 letters" }),
});
