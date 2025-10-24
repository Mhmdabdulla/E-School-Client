import z from "zod";


// Zod Schema for Profile Update Validation
export const profileUpdateSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .regex(/[a-zA-Z]/, "First name must contain at least one letter")
    .max(50, "First name cannot exceed 50 characters"),
  
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .regex(/[a-zA-Z]/, "Last name must contain at least one letter")
    .max(50, "Last name cannot exceed 50 characters"),
  
  title: z
    .string()
    .trim()
    .max(50, "Title cannot exceed 50 characters")
    .optional()
    .refine(
      (val) => !val || /[a-zA-Z]/.test(val),
      "Title must contain at least one letter if provided"
    ),
});

export type ProfileUpdateSchemaType = z.infer<typeof profileUpdateSchema>;