import { queryReviews } from "~~/server/modules/review/review.model"

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const data = await queryReviews(query)
    return { error: false, message: null, data }
  } catch (e: any) {
    return { error: true, message: e.message, data: null }
  }
})
