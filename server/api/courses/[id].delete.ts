import {
  deleteCourse,
  queryCourseList
} from "~~/server/modules/course/course.model"

export default defineEventHandler(async (event) => {
  try {
    await deleteCourse(event.context.params.id)
    const data = await queryCourseList({})
    return { error: false, message: null, data }
  } catch (e: any) {
    return { error: true, message: e.message, data: null }
  }
})
