import { z } from "zod";
import { passwordSchema } from "./password.schema";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email").min(1, "Email is required"),
  password: passwordSchema,
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
