import { z } from "zod";

export const passwordSchema = z
  .string()
  .trim()
  .superRefine((val, ctx) => {
    if (val.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: 8,
        origin: "string",
        inclusive: true,
        message: "Password must be at least 8 characters long",
      });
    }

    if (!/[a-zA-Z]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must contain at least one letter",
      });
    }

    if (!/[0-9]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must contain at least one number",
      });
    }

    if (!/[\W_]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must contain at least one special character",
      });
    }

    if (!/[A-Z]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must contain at least one uppercase letter",
      });
    }

    if (/password|123456|qwerty|letmein/i.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password cannot contain common patterns",
      });
    }
  });
