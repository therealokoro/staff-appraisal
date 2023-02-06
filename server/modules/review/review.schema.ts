import { z } from "zod"

export const CreateReviewSchema = z.object({
  results: z.array(z.any(), { required_error: "results is required" }),
  courseId: z.string({ required_error: "course id is required" }),
  studentId: z.string({ required_error: "student id is required" }),
  sessionId: z.string({ required_error: "session id is required" }),
  isAnonynmous: z.boolean().optional()
})

export type CreateReviewInput = z.infer<typeof CreateReviewSchema>
