import z from "zod";

const priceValidation = z
  .string()
  .min(1, "Price is required")
  .refine((val) => !isNaN(parseFloat(val)), {
    message: "Price must be a number",
  })
  .refine((val) => parseFloat(val) > 0, {
    message: "Price must be greater than 0",
  })
  .refine((val) => parseFloat(val) <= 10000, {
    message: "Price must be less than 10,000",
  });

const paidCourseSchema = z.object({
  isFree: z.literal(false).default(false).optional(),
  price: priceValidation,
});

const freeCourseSchema = z.object({
  isFree: z.literal(true),
  price: z.string().optional(),
});

const baseSchema = z.object({
  welcomeMessage: z.string().min(20),
  congratulationsMessage: z.string().min(20),
  isPublic: z.boolean().optional(),
});

const courseUnion = z.discriminatedUnion("isFree", [freeCourseSchema, paidCourseSchema]);

export const publishSchema = baseSchema.and(
  courseUnion.default({
    isFree: false,
    price: "0",
  } satisfies z.infer<typeof courseUnion>)
);

export type PublishSchemaType = z.infer<typeof publishSchema>;