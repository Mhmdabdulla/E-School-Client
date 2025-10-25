import * as z from 'zod'

export const advancedInformationSchema = z.object({
  thumbnail: z.union([z.instanceof(File), z.undefined(), z.string()]).refine((val) => val !== null,{
      message: "Thumbnail image is required", 
    }),
  trailer: z.union([z.instanceof(File), z.undefined(), z.string()]).optional(),
  description: z.string({message:'Description is required'}).min(50, "Description should be at least 50 characters long"),
  teachItems: z
    .array(
      z.object({
        id: z.number(),
        content: z
          .string()
          .min(5, "Item should be at least 5 characters long")
          .max(120, "Item must be less than 120 characters"),
      }),
    )
    .min(1, "At least one teaching item is required"),
})

export type AdvancedInformationSchemaType = z.infer<typeof advancedInformationSchema>