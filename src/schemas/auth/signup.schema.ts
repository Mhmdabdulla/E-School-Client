import { z } from "zod";
import { passwordSchema } from "./password.schema";

export const signupSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: passwordSchema,
  });

export type SignupSchemaType = z.infer<typeof signupSchema>;
