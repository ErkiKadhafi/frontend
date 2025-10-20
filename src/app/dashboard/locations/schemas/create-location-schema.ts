import { z } from "zod";

export const createLocationSchema = z.object({
  locationCode: z
    .string({
      error: "Location code is required",
    })
    .regex(/^[A-Z]\d{1,2}$/, {
      message: "Location code must match this format (e.g. A1, B12, C1)",
    }),
  locationName: z
    .string({
      error: "Tier name is required",
    })
    .min(3, { message: "Tier name min 3 letters" })
    .max(100, { message: "Tier name max 100 letters" }),
  locationAddress: z
    .string({
      error: "Tier name is required",
    })
    .min(3, { message: "Tier name min 3 letters" })
    .max(150, { message: "Tier name max 150 letters" }),
});
