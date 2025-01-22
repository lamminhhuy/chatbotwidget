import { z } from "zod";

export const chatSchema = z.object({
  content: z
    .string()
    .nonempty("query is required")
    .transform((val) => val.trim()),
  metadata: z.object({}).optional(),
});