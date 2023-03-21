import { z } from "zod"

export const CreateCourseSchema = z.object({
  title: z.string({ required_error: "title is required" }),
  courseCode: z.string({ required_error: "courseCode is required" }),
  lecturerId: z.string({ required_error: "lecturerId is required" }),
  level: z.enum(["100", "200", "300", "400", "500"], {
    required_error: "level is required"
  })
})

export const EditCourseSchema = CreateCourseSchema.partial()

export const LoginCourseSchema = z.object({
  loginID: z.string({ required_error: "loginID is required" }),
  password: z.string({ required_error: "password is required" })
})

export type CreateCourseInput = z.infer<typeof CreateCourseSchema>
export type EditCourseInput = z.infer<typeof EditCourseSchema>
