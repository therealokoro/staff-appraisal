import { createNewReview } from "~~/server/modules/review/review.model"
import { CreateReviewSchema } from "~~/server/modules/review/review.schema"

export default defineEventHandler(async (event) => {
  try {
    const input = CreateReviewSchema.parse(await readBody(event))
    const data = await createNewReview(input)
    return { error: false, message: null, data }
  } catch (e: any) {
    return { error: true, message: e.message, data: null }
  }
})
