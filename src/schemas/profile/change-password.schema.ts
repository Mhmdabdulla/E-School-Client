import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, "Current password is required").max(100),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .regex(/[a-zA-Z]/, "New password must contain at least one letter")
      .regex(/[0-9]/, "New password must contain at least one number"),
    confirmPassword: z.string().min(8, "Confirm password is required").max(100),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords don't match",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;