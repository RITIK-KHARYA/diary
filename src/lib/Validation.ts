import { z } from "zod";

const requiredString = z.string().trim().min(1, "required");

export const createpostschema = z.object({
  content: requiredString,
});

export const updateuserprofileschema = z.object({
  displayName: requiredString,
  bio: z.string().max(1000, "max 1000 characters"),
});

export type updateuserprofileValue = z.infer<typeof updateuserprofileschema>;
