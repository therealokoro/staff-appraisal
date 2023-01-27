import { z } from "zod"

export const CreateQuestionSchema = z.object({
  body: z.string({ required_error: "title is required" })
})

export const EditQuestionSchema = CreateQuestionSchema.partial()

export type CreateQuestionInput = z.infer<typeof CreateQuestionSchema>
export type EditQuestionInput = z.infer<typeof EditQuestionSchema>
