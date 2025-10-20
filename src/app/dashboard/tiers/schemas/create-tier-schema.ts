import { z } from "zod";

export const createTierSchema = z.object({
  tierCode: z
    .number({
      error: "Tier code is required",
    })
    .min(1, { message: "Tier code min 1 digits" })
    .max(999, { message: "Tier code max 999 digits" }),
  tierName: z
    .string({
      error: "Tier name is required",
    })
    .min(3, { message: "Tier name min 3 letters" })
    .max(100, { message: "Tier name max 100 letters" }),
});
