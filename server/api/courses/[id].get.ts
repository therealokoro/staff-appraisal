import { fetchCourseByID } from "~~/server/modules/course/course.model"

export default defineEventHandler(async (event) => {
  try {
    const data = await fetchCourseByID(event.context.params.id)
    return { error: false, message: null, data }
  } catch (e: any) {
    return { error: true, message: e.message, data: null }
  }
})
