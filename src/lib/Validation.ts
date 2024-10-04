import { z } from "zod";

const requiredString = z.string().trim().min(1, "required");

export const createpostschema = z.object({
  content: requiredString,
  mediaIds: z.array(z.string()).max(5, "cannot be more than 5"),
});

export const updateuserprofileschema = z.object({
  displayname: requiredString,
  bio: z.string().max(1000, "max 1000 characters"),
});

export type updateuserprofileValue = z.infer<typeof updateuserprofileschema>;
