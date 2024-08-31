import { z } from "zod";

const requiredString = z.string().trim().min(1, "required");

export const createpostschema = z.object({
  content: requiredString,
});
