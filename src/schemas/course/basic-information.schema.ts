import * as z from 'zod'

export const basicInformationSchema = z.object({
  title: z
    .string({ message: "Please enter a title" })
    .trim()
    .min(5, "Title should be at least 5 characters long")
    .max(80, "Title must be less than 80 characters")
    .regex(/[a-zA-Z0-9]/, "Title must contain at least one letter or number"),
  subtitle: z
    .string()
    .trim()
    .min(10, "Subtitle should be at least 10 characters long")
    .max(120, "Subtitle must be less than 120 characters"),
  category: z.string({message:"Please select a category"}).min(1, "Please select a category"),
  subCategory: z.string({message: "Please select a sub-category"}).min(1, "Please select a sub-category"),
  topic: z.string({message: "Please enter a topic"}).min(5, "Topic should be at least 5 characters long"),
  language: z.string({message:"Please select a language"}).min(1, "Please select a language"),
  level: z.string({message: "Please select a course level"}).min(1, "Please select a course level"),
  // duration: z.string({message: "Please enter course duration"}).min(1, "Please enter course duration"),
  // durationUnit: z.enum(["day", "week", "month"], {
  //   errorMap: () => ({ message: "Please select a duration unit" }),
  // }),
})

export type BasicInformationSchemaType = z.infer<typeof basicInformationSchema>