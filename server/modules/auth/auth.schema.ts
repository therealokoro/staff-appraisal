import { z } from "zod"

export const CreateUserSchema = z.object({
  surname: z.string({ required_error: "surname is required" }),
  firstname: z.string({ required_error: "firstname is required" }),
  // email: z
  //   .string({ required_error: "email is required" })
  //   .email("Provide a valid email address"),
  level: z.string({ required_error: "level is required" }),
  admissionNo: z.string({ required_error: "admissionNo is required" }),
  password: z.string({ required_error: "password is required" }),
  role: z.enum(["STUDENT", "ADMIN"])
})

export const EditUserSchema = CreateUserSchema.omit({
  password: true,
  role: true
})

export const LoginUserSchema = z.object({
  loginID: z.string({ required_error: "loginID is required" }),
  password: z.string({ required_error: "password is required" })
})

export type CreateUserInput = z.infer<typeof CreateUserSchema>
export type EditUserInput = z.infer<typeof EditUserSchema>
export type LoginUserInput = z.infer<typeof LoginUserSchema>
