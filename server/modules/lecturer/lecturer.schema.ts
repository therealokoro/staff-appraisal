import { z } from "zod"

export const CreateLecturerSchema = z.object({
  surname: z.string({ required_error: "surname is required" }),
  firstname: z.string({ required_error: "firstname is required" }),
  title: z.enum(["Mr.", "Mrs.", "Dr,", "Prof.", "Mal."], {
    required_error: "title is required"
  })
})

export const EditLecturerSchema = CreateLecturerSchema

export type CreateLecturerInput = z.infer<typeof CreateLecturerSchema>
export type EditLecturerInput = z.infer<typeof EditLecturerSchema>
